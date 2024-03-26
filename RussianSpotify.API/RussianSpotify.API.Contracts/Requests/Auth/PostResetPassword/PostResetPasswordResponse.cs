namespace RussianSpotify.Contracts.Requests.Account.PostResetPassword;

public class PostResetPasswordResponse
{
    /// <summary>
    /// Почта пользователя
    /// </summary>
    public string Email { get; set; } = default!;

    /// <summary>
    /// Новый пароль пользователя
    /// </summary>
    public string NewPassword { get; set; } = default!;
}