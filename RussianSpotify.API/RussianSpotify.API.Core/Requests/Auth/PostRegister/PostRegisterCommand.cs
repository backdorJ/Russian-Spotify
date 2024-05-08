using MediatR;
using RussianSpotify.Contracts.Requests.Auth.PostRegister;

namespace RussianSpotify.API.Core.Requests.Auth.PostRegister;

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