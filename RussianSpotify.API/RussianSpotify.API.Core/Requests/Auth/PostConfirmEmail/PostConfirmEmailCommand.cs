using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostConfirmEmail;

namespace RussianSpotify.API.Core.Requests.Account.PostConfirmEmail;

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