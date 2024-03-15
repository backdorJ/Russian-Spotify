using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Exceptions.OAuthAccountExceptions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.Contracts.Requests.OAuthAccount.GetExternalLoginCallback;

namespace RussianSpotify.API.Core.Requests.OAuthAccount.GetExternalLoginCallback;

/// <summary>
/// Обработчик для <see cref="GetExternalLoginCallbackCommand"/>
/// </summary>
public class GetExternalLoginCallbackCommandHandler :
    IRequestHandler<GetExternalLoginCallbackCommand, GetExternalLoginCallbackResponse>
{
    private readonly IJwtGenerator _jwtGenerator;

    private readonly UserManager<User> _userManager;

    private readonly SignInManager<User> _signInManager;

    public GetExternalLoginCallbackCommandHandler(IJwtGenerator jwtGenerator,
        UserManager<User> userManager,
        SignInManager<User> signInManager)
    {
        _jwtGenerator = jwtGenerator;
        _userManager = userManager;
        _signInManager = signInManager;
    }
    
    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<GetExternalLoginCallbackResponse> Handle(GetExternalLoginCallbackCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        var info = await _signInManager.GetExternalLoginInfoAsync();
        
        if (info is null)
            throw new ExternalLoginInfoNotFoundException(AuthErrorMessages.ExternalLoginInfoNotFound);

        var claims = info.Principal.Claims.ToList();
        
        var jwt = _jwtGenerator.GenerateToken(claims);
        var refreshToken = _jwtGenerator.GenerateRefreshToken();

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

        user.AccessToken = jwt;
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(TokenConfiguration.RefreshTokenExpiryDays);

        await _userManager.UpdateAsync(user);
        
        return new GetExternalLoginCallbackResponse
            { AccessToken = jwt, RefreshToken = refreshToken };
    }
}