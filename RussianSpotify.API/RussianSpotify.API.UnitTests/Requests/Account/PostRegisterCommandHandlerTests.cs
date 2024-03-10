using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Requests.Account.PostRegister;
using RussianSpotify.API.UnitTests.Commons.AccountCommon;
using RussianSpotify.Contracts.Requests.Account.PostRegister;

namespace RussianSpotify.API.UnitTests.Requests.Account;

public class PostRegisterCommandHandlerTests : AccountCommandTestBase
{
    [Theory]
    [InlineData("unregisteredUser", "unregisterd@gmail.com", "123456789", "123456789")]
    public async Task PostRegisterCommand_Success(string userName,
        string email,
        string password,
        string passwordConfirm)
    {
        // Arrange
        var command = new PostRegisterCommand(new PostRegisterRequest
        {
            UserName = userName,
            Email = email,
            Password = password,
            PasswordConfirm = passwordConfirm
        });

        var postRegisterCommandHandler = new PostRegisterCommandHandler(UserManager);
        // Act
        await postRegisterCommandHandler.Handle(command, default);
        var registeredUser = await UserManager.FindByEmailAsync(email);

        // Assert
        Assert.NotNull(registeredUser);
    }

    [Fact]
    public async Task PostRegisterCommand_NullCommand()
    {
        // Arrange
        var postRegisterCommandHandler = new PostRegisterCommandHandler(UserManager);

        // Act
        // Assert
        await Assert.ThrowsAsync<ArgumentNullException>(async () => 
            await postRegisterCommandHandler.Handle(null!, default));
    }

    [Fact]
    public async Task PostRegisterCommand_AlreadyRegisteredEmail()
    {
        // Arrange
        var command = new PostRegisterCommand(new PostRegisterRequest
        {
            Email = EfContextFactory.RegisteredUser.Email!,
            UserName = "unregistered",
            Password = "123456789",
            PasswordConfirm = "123456789"
        });
        
        var postRegisterCommandHandler = new PostRegisterCommandHandler(UserManager);

        // Act
        // Assert
        await Assert.ThrowsAsync<EmailAlreadyRegisteredException>(async () =>
            await postRegisterCommandHandler.Handle(command, default));
    }

    [Theory]
    [InlineData("","","","")]
    [InlineData("ssdlskdsl","email@mail.com","233333333","244444444")]
    [InlineData("sdfdfsdf","sdsd","233333333","233333333")]
    public async Task PostRegisterCommand_InvalidUserData(string userName,
        string email,
        string password,
        string passwordConfirm)
    {
        // Arrange
        var command = new PostRegisterCommand(new PostRegisterRequest
        {
            UserName = userName,
            Email = email,
            Password = password,
            PasswordConfirm = passwordConfirm
        });

        // Act
        var validationResult = await PostRegisterValidator.ValidateAsync(command);
        
        // Assert
        Assert.NotEmpty(validationResult.Errors);
    }
}