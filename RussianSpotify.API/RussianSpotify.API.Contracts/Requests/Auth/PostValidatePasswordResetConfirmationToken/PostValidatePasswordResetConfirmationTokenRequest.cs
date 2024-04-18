namespace RussianSpotify.Contracts.Requests.Auth.PostValidatePasswordResetConfirmationToken;

public class PostValidatePasswordResetConfirmationTokenRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">PostValidatePasswordResetConfirmationTokenRequest</param>
    public PostValidatePasswordResetConfirmationTokenRequest(PostValidatePasswordResetConfirmationTokenRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        VerificationCodeFromUser = request.VerificationCodeFromUser;
    }

    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public PostValidatePasswordResetConfirmationTokenRequest()
    {
    }

    /// <summary>
    /// Код подтверждение для сброса пароля
    /// </summary>
    public string VerificationCodeFromUser { get; set; } = default!;
}