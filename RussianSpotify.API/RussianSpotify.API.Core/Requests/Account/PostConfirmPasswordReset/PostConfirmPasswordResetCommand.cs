using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostConfirmPasswordReset;

namespace RussianSpotify.API.Core.Requests.Account.PostConfirmPasswordReset;

/// <summary>
/// Команда на подтверждение сброса пароля
/// </summary>
public class PostConfirmPasswordResetCommand : PostConfirmPasswordResetRequest, IRequest
{
    public PostConfirmPasswordResetCommand(PostConfirmPasswordResetRequest request) : base(request)
    {
    }

    public PostConfirmPasswordResetCommand()
    {
    }
}