using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotift.API.Data.PostgreSQL.Seeder;

/// <summary>
/// Сид базовых значений в бд
/// </summary>
public class DbSeeder : IDbSeeder
{
    private static readonly IReadOnlyDictionary<Guid, string> BaseRoles = new Dictionary<Guid, string>()
    {
        [BaseRoleIds.AdminId] = "Админ",
        [BaseRoleIds.AuthorId] = "Автор",
        [BaseRoleIds.UserId] = "Пользователь"
    };

    /// <inheritdoc />
    public async Task SeedAsync(IDbContext efContext, CancellationToken cancellationToken)
    {
        await SeedRoleAsync(efContext, cancellationToken);
        await SeedPrivilegesAsync(efContext, cancellationToken);
        await efContext.SaveChangesAsync(cancellationToken);
    }

    private static async Task SeedRoleAsync(IDbContext dbContext, CancellationToken cancellationToken)
    {
        var existsRolesInDb = await dbContext.Roles
            .Where(x => BaseRoles.Keys.Contains(x.Id))
            .Select(x => x.Id)
            .ToListAsync(cancellationToken) ?? new List<Guid>();

        var rolesToSeed = BaseRoles
            .Where(x => !existsRolesInDb.Contains(x.Key))
            .Select(x => new Role { Id = x.Key, Name = x.Value })
            .ToList();
        
        rolesToSeed.ForEach(x =>
        {
            if (!BaseRoleIds.RolePrivileges.TryGetValue(x.Id, out var privileges))
                throw new ArgumentException("Не найдена для данной роли привилегий");
            
            x.UpdatePrivileges(privileges);
        });

        await dbContext.Roles.AddRangeAsync(rolesToSeed, cancellationToken);
    }

    private static async Task SeedPrivilegesAsync(IDbContext dbContext, CancellationToken cancellationToken)
    {
        var existsRolesInDb = await dbContext.Roles
            .Include(x => x.Privileges)
            .Where(x => BaseRoleIds.RolePrivileges.Keys.Contains(x.Id))
            .ToListAsync(cancellationToken);
        
        existsRolesInDb.ForEach(x =>
        {
            if (!BaseRoleIds.RolePrivileges.TryGetValue(x.Id, out var privileges))
                throw new ArgumentException("Не найдена для данной роли привилегий");

            var currentPriviles = x.Privileges.Select(y => y.Privilege).ToList();
            currentPriviles.AddRange(privileges);
            currentPriviles = currentPriviles.Distinct().ToList();
            
            x.UpdatePrivileges(currentPriviles);
        });
    }
}