using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostResetPassword;

namespace RussianSpotify.API.Core.Requests.Account.PostResetPassword;

public class PostResetPasswordCommand : PostResetPasswordRequest, IRequest<PostResetPasswordResponse>
{
    public PostResetPasswordCommand(PostResetPasswordRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        Email = request.Email;
        NewPassword = request.NewPassword;
        NewPasswordConfirm = request.NewPasswordConfirm;
    }
}