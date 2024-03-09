namespace RussianSpotify.Contracts.Requests.Account.PostRegister;

/// <summary>
/// Запрос на регистрацию
/// </summary>
public class PostRegisterRequest
{
    /// <summary>
    /// Никнейм юзера
    /// </summary>
    public string UserName { get; set; } = default!;

    /// <summary>
    /// Пароль
    /// </summary>
    public string Password { get; set; } = default!;

    /// <summary>
    /// Подтверждение пароля
    /// </summary>
    public string PasswordConfirm { get; set; } = default!;

    /// <summary>
    /// Почта
    /// </summary>
    public string Email { get; set; } = default;
}