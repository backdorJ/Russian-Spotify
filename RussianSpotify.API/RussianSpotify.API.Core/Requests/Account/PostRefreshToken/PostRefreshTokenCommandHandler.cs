using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.Contracts.Requests.Account.PostRefreshToken;

namespace RussianSpotify.API.Core.Requests.Account.PostRefreshToken;

/// <summary>
/// Обработчик для <see cref="PostRefreshTokenCommand"/>
/// </summary>
public class PostRefreshTokenCommandHandler : IRequestHandler<PostRefreshTokenCommand, PostRefreshTokenResponse>
{
    private readonly UserManager<User> _userManager;

    private readonly IJwtGenerator _jwtGenerator;

    public PostRefreshTokenCommandHandler(UserManager<User> userManager, IJwtGenerator jwtGenerator)
        => (_userManager, _jwtGenerator) = (userManager, jwtGenerator);
    
    /// <inheritdoc cref="IRequestHandler{TRequest, TResponse}"/>
    public async Task<PostRefreshTokenResponse> Handle(PostRefreshTokenCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var principal = _jwtGenerator.GetPrincipalFromExpiredToken(request.AccessToken);

        if (principal is null)
            throw new InvalidTokenException(AuthErrorMessages.InvalidAccessToken);

        var userEmail = principal.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;

        var user = await _userManager.FindByEmailAsync(userEmail);

        if (user is null)
            throw new InvalidTokenException(AuthErrorMessages.InvalidAccessToken);
        
        if (user.RefreshToken != request.RefreshToken
            || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            throw new InvalidTokenException(AuthErrorMessages.InvalidRefreshToken);

        var newAccessToken = _jwtGenerator.GenerateToken(principal.Claims.ToList());
        var newRefreshToken = _jwtGenerator.GenerateRefreshToken();

        user.AccessToken = newAccessToken;
        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(TokenConfiguration.RefreshTokenExpiryDays);
        
        await _userManager.UpdateAsync(user);

        return new PostRefreshTokenResponse { AccessToken = newAccessToken, RefreshToken = newRefreshToken };
    }
}