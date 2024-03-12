using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostConfirmEmail;

namespace RussianSpotify.API.Core.Requests.Account.PostConfirmEmail;

/// <summary>
/// Команда для подтверждения почты пользователя
/// </summary>
public class PostConfirmEmailCommand : PostConfirmEmailRequest, IRequest
{
    public PostConfirmEmailCommand(PostConfirmEmailRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        Email = request.Email;
        EmailVerificationCodeFromUser = request.EmailVerificationCodeFromUser;
    }

    public PostConfirmEmailCommand()
    {
    }
}