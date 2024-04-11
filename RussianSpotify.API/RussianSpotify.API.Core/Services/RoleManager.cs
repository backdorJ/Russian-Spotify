using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services;

/// <inheritdoc cref="IRoleManager"/>
public class RoleManager : IRoleManager
{
    private readonly IJwtGenerator _jwtGenerator;

    public RoleManager(IJwtGenerator jwtGenerator)
    {
        _jwtGenerator = jwtGenerator;
    }
    
    /// <inheritdoc cref="IRoleManager"/>
    public bool IsInRole(User user, string roleName)
    {
        var claims = _jwtGenerator.GetPrincipalFromExpiredToken(user.AccessToken!);

        return claims.IsInRole(roleName);
    }
}