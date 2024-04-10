using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services;

/// <inheritdoc cref="IRoleManager"/>
public class RoleManager(IJwtGenerator jwtGenerator) : IRoleManager
{
    /// <inheritdoc cref="IRoleManager"/>
    public bool IsInRole(User user, string roleName)
    {
        var claims = jwtGenerator.GetPrincipalFromExpiredToken(user.AccessToken!);

        return claims.IsInRole(roleName);
    }
}