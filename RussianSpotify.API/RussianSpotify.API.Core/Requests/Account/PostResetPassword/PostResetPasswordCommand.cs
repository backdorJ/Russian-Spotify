using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostResetPassword;

namespace RussianSpotify.API.Core.Requests.Account.PostResetPassword;

/// <summary>
/// Команда для сброса пароля
/// </summary>
public class PostResetPasswordCommand : PostResetPasswordRequest, IRequest<PostResetPasswordResponse>
{
    public PostResetPasswordCommand(PostResetPasswordRequest request) : base(request)
    {
    }
}