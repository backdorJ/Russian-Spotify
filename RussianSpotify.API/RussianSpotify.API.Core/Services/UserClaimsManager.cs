using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services;

public class UserClaimsManager : IUserClaimsManager
{
    private readonly UserManager<User> _userManager;

    public UserClaimsManager(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<List<Claim>> GetUserClaimsAsync(User user,
        CancellationToken cancellationToken = default)
    {
        var userRoles = await _userManager.GetRolesAsync(user);
        
        var authClaims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName!),
            new(ClaimTypes.Email, user.Email!),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        
        authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

        return authClaims;
    }
}