using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Exceptions.AuthExceptions;
using RussianSpotify.API.Core.Exceptions.OAuthExceptions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.Contracts.Requests.OAuth.GetExternalLoginCallback;

namespace RussianSpotify.API.Core.Requests.OAuth.GetExternalLoginCallback;

/// <summary>
/// Обработчик для <see cref="GetExternalLoginCallbackCommand"/>
/// </summary>
public class GetExternalLoginCallbackCommandHandler :
    IRequestHandler<GetExternalLoginCallbackCommand, GetExternalLoginCallbackResponse>
{
    private readonly IJwtGenerator _jwtGenerator;

    private readonly UserManager<User> _userManager;

    private readonly SignInManager<User> _signInManager;

    private readonly IHttpContextAccessor _contextAccessor;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="jwtGenerator">JWT генератор</param>
    /// <param name="userManager">User Manager <see cref="UserManager{TUser}"/></param>
    /// <param name="signInManager">Sign in manager <see cref="SignInManager{TUser}"/></param>
    /// <param name="contextAccessor">Http Context Accessor</param>
    public GetExternalLoginCallbackCommandHandler(IJwtGenerator jwtGenerator,
        UserManager<User> userManager,
        SignInManager<User> signInManager, IHttpContextAccessor contextAccessor)
    {
        _jwtGenerator = jwtGenerator;
        _userManager = userManager;
        _signInManager = signInManager;
        _contextAccessor = contextAccessor;
    }
    
    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<GetExternalLoginCallbackResponse> Handle(GetExternalLoginCallbackCommand request, CancellationToken cancellationToken)
    {
         if (request is null)
            throw new ArgumentNullException(nameof(request));
        
         var info = await _signInManager.GetExternalLoginInfoAsync();
        
         if (info is null)
             throw new ExternalLoginInfoNotFoundException(AuthErrorMessages.ExternalLoginInfoNotFound);

         var claims = info.Principal.Claims
             .Where(x => !x.Type.Equals(ClaimTypes.NameIdentifier, StringComparison.OrdinalIgnoreCase))
             .ToList();

         var email = claims.GetClaimValueOf(ClaimTypes.Email);
         if (email is null)
             throw new EmailClaimNotFoundException(AuthErrorMessages.EmailClaimNotFound);

         var user = await _userManager.FindByEmailAsync(email);
        
         if (user is null)
         {
             user = new User
             {
                 UserName = claims.GetClaimValueOf(ClaimTypes.Name) ??
                            $"{claims.GetClaimValueOf(ClaimTypes.GivenName)}" +
                            $" {claims.GetClaimValueOf(ClaimTypes.Surname)}", 
                 Email = email,
                 EmailConfirmed = true
             };

             var createUserResult = await _userManager.CreateAsync(user);

             if (!createUserResult.Succeeded)
                 throw new RegisterUserException(string.Join("\n",
                     createUserResult.Errors.Select(error => error.Description)));
            
             await _userManager.AddToRoleAsync(user, BaseRoles.UserRoleName);
         }
         else
         {
             var roles = await _userManager.GetRolesAsync(user);
             claims.Add(new(ClaimTypes.Role, roles.First()));
         }

         claims.Add(new(ClaimTypes.NameIdentifier, user.Id.ToString()));
         
         var jwt = _jwtGenerator.GenerateToken(claims);
         var refreshToken = _jwtGenerator.GenerateRefreshToken();
        
         user.AccessToken = jwt;
         user.RefreshToken = refreshToken;
         user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(TokenConfiguration.RefreshTokenExpiryDays);

         await _userManager.UpdateAsync(user);
        
         _contextAccessor.HttpContext?.Response.Cookies.Append(
             BaseCookieOptions.AccessTokenCookieName, user.AccessToken, BaseCookieOptions.Options);
         _contextAccessor.HttpContext?.Response.Cookies.Append(
             BaseCookieOptions.RefreshTokenCookieName, user.RefreshToken, BaseCookieOptions.Options);
         
         return new GetExternalLoginCallbackResponse
             { AccessToken = jwt, RefreshToken = refreshToken };
    }
}