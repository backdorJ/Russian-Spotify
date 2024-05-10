namespace RussianSpotify.Contracts.Requests.Auth.PostRegister;

/// <summary>
/// Запрос на регистрацию
/// </summary>
public class PostRegisterRequest
{
    public PostRegisterRequest(PostRegisterRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        UserName = request.UserName;
        Password = request.Password;
        PasswordConfirm = request.PasswordConfirm;
        Email = request.Email;
        Role = request.Role;
    }

    public PostRegisterRequest()
    {
    }

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
    public string Email { get; set; } = default!;

    /// <summary>
    /// Роль пользователя
    /// </summary>
    public string Role { get; set; } = default!;
}