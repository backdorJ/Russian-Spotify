namespace RussianSpotify.Contracts.Requests.Account.PostConfirmPasswordReset;

public class PostConfirmPasswordResetRequest
{
    public PostConfirmPasswordResetRequest(PostConfirmPasswordResetRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        NewPassword = request.NewPassword;
        Email = request.Email;
        VerificationCodeFromUser = request.VerificationCodeFromUser;
    }

    public PostConfirmPasswordResetRequest()
    {
    }
    
    /// <summary>
    /// Email пользователя
    /// </summary>
    public string Email { get; set; } = default!;

    /// <summary>
    /// Код подтверждение для сброса пароля
    /// </summary>
    public string VerificationCodeFromUser { get; set; } = default!;

    /// <summary>
    /// Новый пароль
    /// </summary>
    public string NewPassword { get; set; } = default!;
}