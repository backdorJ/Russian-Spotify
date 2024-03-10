using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostRegister;

namespace RussianSpotify.API.Core.Requests.Account.PostRegister;

/// <summary>
/// Команда для регистрации пользователя
/// </summary>
public class PostRegisterCommand: PostRegisterRequest, IRequest
{
    public PostRegisterCommand(PostRegisterRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        UserName = request.UserName;
        Password = request.Password;
        PasswordConfirm = request.PasswordConfirm;
        Email = request.Email;
    }

    public PostRegisterCommand()
    {
    }
}