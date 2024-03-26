using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.Contracts.Requests.Account.PostLogin;

namespace RussianSpotify.API.Core.Requests.Account.PostLogin;

/// <summary>
/// Обработчик для <see cref="PostLoginCommand"/>
/// </summary>
public class PostLoginCommandHandler : IRequestHandler<PostLoginCommand, PostLoginResponse>
{
    private readonly UserManager<User> _userManager;

    private readonly SignInManager<User> _signInManager;

    private readonly IJwtGenerator _jwtGenerator;

    public PostLoginCommandHandler(UserManager<User> userManager,
        SignInManager<User> signInManager,
        IJwtGenerator jwtGenerator)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtGenerator = jwtGenerator;
    }

    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<PostLoginResponse> Handle(PostLoginCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
            throw new NotFoundUserException(AuthErrorMessages.UserNotFound);

        if (!user.EmailConfirmed)
            throw new NotConfirmedEmailException(AuthErrorMessages.NotConfirmedEmail);
        
        var passwordSignInResult =
            await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: false);
        
        if (!passwordSignInResult.Succeeded)
            throw new WrongPasswordException(AuthErrorMessages.WrongPassword);

        await _signInManager.SignInAsync(user, isPersistent: false, "Bearer JWT");

        var userRoles = await _userManager.GetRolesAsync(user);
        
        var authClaims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName!),
            new(ClaimTypes.Email, request.Email),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        foreach (var role in userRoles) 
            authClaims.Add(new Claim(ClaimTypes.Role, role));
        
        var jwt = _jwtGenerator.GenerateToken(authClaims);
        var refreshToken = _jwtGenerator.GenerateRefreshToken();

        user.AccessToken = jwt;
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(TokenConfiguration.RefreshTokenExpiryDays);

        await _userManager.UpdateAsync(user);
        
        return new PostLoginResponse { AccessToken = jwt, RefreshToken = refreshToken};
    }
}