using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Requests.Account.PostLogin;
using RussianSpotify.API.UnitTests.Commons.AccountCommon;
using RussianSpotify.Contracts.Requests.Account.PostLogin;

namespace RussianSpotify.API.UnitTests.Requests.Account;

public class PostLoginCommandHandlerTests : AccountCommandTestBase
{
    [Fact]
    public async Task PostLoginCommand_NotRegisteredUser()
    {
        // Arrange
        var command = new PostLoginCommand(new PostLoginRequest()
        {
            Email = "email@gmail.com",
            Password = EfContextFactory.RegisteredUserPassword
        });

        var loginCommandHandler = new PostLoginCommandHandler(UserManager, SignInManager, JwtGenerator);

        // Act
        // Assert
        await Assert.ThrowsAsync<NotFoundUserException>(async () =>
            await loginCommandHandler.Handle(command, default));
    }

    [Fact]
    public async Task PostLoginCommand_NullCommand()
    {
        // Arrange
        var loginCommandHandler = new PostLoginCommandHandler(UserManager, SignInManager, JwtGenerator);

        // Act
        // Assert
        await Assert.ThrowsAsync<ArgumentNullException>(async () =>
            await loginCommandHandler.Handle(null!, default));
    }

    [Theory]
    [InlineData("", "")]
    [InlineData("bbb", "123456789")]
    [InlineData("email@gmail.com", "")]
    [InlineData("", "123456789")]
    public async Task PostLoginCommand_InvalidUserInputData(string email, string password)
    {
        // Arrange
        var command = new PostLoginCommand(new PostLoginRequest()
        {
            Email = email,
            Password = password
        });
        
        // Act
        var validationResult = await PostLoginValidator.ValidateAsync(command);
        
        // Assert
        Assert.NotEmpty(validationResult.Errors);
    }
}