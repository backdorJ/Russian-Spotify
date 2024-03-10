using FluentValidation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RussianSpotift.API.Data.PostgreSQL;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Requests.Account.PostLogin;
using RussianSpotify.API.Core.Requests.Account.PostRegister;
using RussianSpotify.API.Core.Services;

namespace RussianSpotify.API.UnitTests.Commons.AccountCommon;

public class AccountCommandTestBase : IDisposable
{
    protected readonly EfContext Context;

    protected readonly UserManager<User> UserManager;

    protected readonly IJwtGenerator JwtGenerator;

    protected SignInManager<User> SignInManager;
    
    protected readonly IValidator<PostLoginCommand> PostLoginValidator = new PostLoginCommandValidator();

    protected readonly IValidator<PostRegisterCommand> PostRegisterValidator = new PostRegisterCommandValidator();

    private readonly IConfiguration _jwtConfiguration = new ConfigurationBuilder().AddInMemoryCollection(
        new Dictionary<string, string>
        {
            {"ValidAudience", "https://localhost:44361/"},
            {"ValidIssuer", "https://localhost:44361/"},
            {"Secret", "TestJwtSecretsdlkdslf"}
        }!).Build();

    protected AccountCommandTestBase()
    {
        JwtGenerator = new JwtGenerator(_jwtConfiguration);
        Context = EfContextFactory.Create();
        using var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole().AddDebug());
        var loggerSignInManager = loggerFactory.CreateLogger<SignInManager<User>>();
        var loggerUserManager = loggerFactory.CreateLogger<UserManager<User>>();
        
        UserManager = new UserManager<User>(new UserStore<User, Role, EfContext, Guid>(Context), 
            default!, new PasswordHasher<User>(), default!,
            default!, default!, default!,
            default!, loggerUserManager);
        
        var optionsAccessor = Options.Create(new IdentityOptions());
        var userClaimsPrincipalFactory = new UserClaimsPrincipalFactory<User>(UserManager, optionsAccessor);
        var authOptions = Options.Create(new AuthenticationOptions());

        SignInManager = new SignInManager<User>(UserManager, new HttpContextAccessor(),
            userClaimsPrincipalFactory, optionsAccessor,
            loggerSignInManager, new AuthenticationSchemeProvider(authOptions),
            new DefaultUserConfirmation<User>());
        
        _ = UserManager.CreateAsync(EfContextFactory.RegisteredUser,
                EfContextFactory.RegisteredUserPassword).Result;
        
        _ = UserManager
            .AddToRoleAsync(EfContextFactory.RegisteredUser, BaseRoles.UserRoleName.ToUpper()).Result;
    }
    
    public void Dispose() => EfContextFactory.Destroy(Context);
}