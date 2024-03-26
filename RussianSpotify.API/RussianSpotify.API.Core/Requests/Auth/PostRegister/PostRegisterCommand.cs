using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostRegister;

namespace RussianSpotify.API.Core.Requests.Account.PostRegister;

/// <summary>
/// Команда для регистрации пользователя
/// </summary>
public class PostRegisterCommand: PostRegisterRequest, IRequest<PostRegisterResponse>
{
    public PostRegisterCommand(PostRegisterRequest request) : base(request)
    {
    }

    public PostRegisterCommand()
    {
    }
}