using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services;

/// <inheritdoc cref="IRoleManager"/>
public class RoleManager : IRoleManager
{
    private readonly UserManager<User> _userManager;

    public RoleManager(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    /// <inheritdoc cref="IRoleManager"/>
    public async Task<bool> IsInRoleAsync(User user, string roleName, CancellationToken cancellationToken = new())
    {
        var roles = await _userManager.GetRolesAsync(user);

        return roles.Contains(roleName);
    }
}