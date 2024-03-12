using Microsoft.EntityFrameworkCore;
using RussianSpotift.API.Data.PostgreSQL;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.UnitTests.Commons.AccountCommon;

public class EfContextFactory
{
    public const string RegisteredUserPassword = "password";
    
    public static User RegisteredUser = new()
    {
        Id = Guid.NewGuid(),
        Email = "String@mail.com",
        NormalizedEmail = "String@mail.com".ToUpper(),
        SecurityStamp = Guid.NewGuid().ToString(),
        UserName = "userNameUserPasswordPasswordEmailString@mail.com"
    };
    
    public static EfContext Create()
    {
        var options = new DbContextOptionsBuilder<EfContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        var context = new EfContext(options);
        
        context.Database.EnsureCreated();
        
        context.Roles.Add(new Role
        {
            Name = BaseRoles.UserRoleName,
            NormalizedName = BaseRoles.UserRoleName.ToUpper(),
            Id = BaseRoles.UserId
        });

        context.SaveChanges();

        return context;
    }

    public static void Destroy(EfContext context)
    {
        context.Database.EnsureDeleted();
        context.Dispose();
    }
}