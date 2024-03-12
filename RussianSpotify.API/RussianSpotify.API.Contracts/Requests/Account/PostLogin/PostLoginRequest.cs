namespace RussianSpotify.Contracts.Requests.Account.PostLogin;

/// <summary>
/// Запрос на логин для PostLogin
/// </summary>
public class PostLoginRequest
{
    /// <summary>
    /// Почта пользователя
    /// </summary>
    public string Email { get; set; } = default!;

    /// <summary>
    /// Пароль
    /// </summary>
    public string Password { get; set; } = default!;
}