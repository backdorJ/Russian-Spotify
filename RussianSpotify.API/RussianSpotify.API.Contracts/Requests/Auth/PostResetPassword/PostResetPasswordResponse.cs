namespace RussianSpotify.Contracts.Requests.Auth.PostResetPassword;

/// <summary>
/// Ответ на запрос сброса пароля
/// </summary>
public class PostResetPasswordResponse
{
    /// <summary>
    /// Почта пользователя
    /// </summary>
    public string Email { get; set; } = default!;
}