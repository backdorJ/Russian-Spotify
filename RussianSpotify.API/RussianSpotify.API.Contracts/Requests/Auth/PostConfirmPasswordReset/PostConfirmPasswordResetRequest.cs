namespace RussianSpotify.Contracts.Requests.Auth.PostConfirmPasswordReset;

/// <summary>
/// Запроса на подтверждение сброса пароля
/// </summary>
public class PostConfirmPasswordResetRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">PostConfirmPasswordResetRequest</param>
    public PostConfirmPasswordResetRequest(PostConfirmPasswordResetRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        NewPassword = request.NewPassword;
        NewPasswordConfirm = request.NewPasswordConfirm;
        Email = request.Email;
        VerificationCodeFromUser = request.VerificationCodeFromUser;
    }

    /// <summary>
    /// Пустой конструктор
    /// </summary>
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

    /// <summary>
    /// Подтверждение нового пароля
    /// </summary>
    public string NewPasswordConfirm { get; set; } = default!;
}