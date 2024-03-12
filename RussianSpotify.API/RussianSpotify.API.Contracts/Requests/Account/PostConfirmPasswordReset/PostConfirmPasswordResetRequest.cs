namespace RussianSpotify.Contracts.Requests.Account.PostConfirmPasswordReset;

public class PostConfirmPasswordResetRequest
{
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