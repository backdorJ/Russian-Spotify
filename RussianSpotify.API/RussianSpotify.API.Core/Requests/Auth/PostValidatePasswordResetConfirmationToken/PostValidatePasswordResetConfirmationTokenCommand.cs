using MediatR;
using RussianSpotify.Contracts.Requests.Auth.PostValidatePasswordResetConfirmationToken;

namespace RussianSpotify.API.Core.Requests.Auth.PostValidatePasswordResetConfirmationToken;

/// <summary>
/// Команда для проверки кода подтверждения для сброса пароля
/// </summary>
public class PostValidatePasswordResetConfirmationTokenCommand :
    PostValidatePasswordResetConfirmationTokenRequest, IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">PostValidatePasswordResetConfirmationTokenRequest</param>
    public PostValidatePasswordResetConfirmationTokenCommand(PostValidatePasswordResetConfirmationTokenRequest request)
        : base(request)
    {
    }
    
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public PostValidatePasswordResetConfirmationTokenCommand()
    {
    }
}