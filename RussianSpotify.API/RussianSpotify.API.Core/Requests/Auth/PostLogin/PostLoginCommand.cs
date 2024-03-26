using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostLogin;

namespace RussianSpotify.API.Core.Requests.Account.PostLogin;

/// <summary>
/// Команда для авторизации пользователя
/// </summary>
public class PostLoginCommand:  PostLoginRequest, IRequest<PostLoginResponse>
{
    public PostLoginCommand(PostLoginRequest request) : base(request)
    {
    }

    public PostLoginCommand()
    {
    }
}