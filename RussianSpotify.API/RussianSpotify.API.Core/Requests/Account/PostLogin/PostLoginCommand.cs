using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostLogin;

namespace RussianSpotify.API.Core.Requests.Account.PostLogin;

/// <summary>
/// Команда для авторизации пользователя
/// </summary>
public class PostLoginCommand:  PostLoginRequest, IRequest<PostLoginResponse>
{
    public PostLoginCommand(PostLoginRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        Email = request.Email;
        Password = request.Password;
    }

    public PostLoginCommand()
    {
    }
}