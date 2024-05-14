using MediatR;
using RussianSpotify.Contracts.Requests.Auth.PostConfirmEmail;

namespace RussianSpotify.API.Core.Requests.Auth.PostConfirmEmail;

/// <summary>
/// Команда для подтверждения почты пользователя
/// </summary>
public class PostConfirmEmailCommand : PostConfirmEmailRequest, IRequest
{
    public PostConfirmEmailCommand(PostConfirmEmailRequest request) : base(request)
    {
    }

    public PostConfirmEmailCommand()
    {
    }
}