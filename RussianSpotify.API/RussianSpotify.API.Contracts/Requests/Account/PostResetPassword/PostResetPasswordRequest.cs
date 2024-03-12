namespace RussianSpotify.Contracts.Requests.Account.PostResetPassword;

public class PostResetPasswordRequest
{
    /// <summary>
    /// Email пользователя
    /// </summary>
    public string Email { get; set; } = default!;

    /// <summary>
    /// Новый пароль
    /// </summary>
    public string NewPassword { get; set; } = default!;

    /// <summary>
    /// Подтверждение нового пароля
    /// </summary>
    public string NewPasswordConfirm { get; set; } = default!;
}