using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostConfirmPasswordReset;

namespace RussianSpotify.API.Core.Requests.Account.PostConfirmPasswordReset;

public class PostConfirmPasswordResetCommand : PostConfirmPasswordResetRequest, IRequest
{
    public PostConfirmPasswordResetCommand(PostConfirmPasswordResetRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        NewPassword = request.NewPassword;
        Email = request.Email;
        VerificationCodeFromUser = request.VerificationCodeFromUser;
    }

    public PostConfirmPasswordResetCommand()
    {
    }
}