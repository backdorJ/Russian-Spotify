namespace RussianSpotify.Contracts.Requests.Auth.PostLogin;

/// <summary>
/// Запрос на логин для PostLogin
/// </summary>
public class PostLoginRequest
{
    public PostLoginRequest(PostLoginRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        Email = request.Email;
        Password = request.Password;
    }

    public PostLoginRequest()
    {
    }

    /// <summary>
    /// Почта пользователя
    /// </summary>
    public string Email { get; set; } = default!;

    /// <summary>
    /// Пароль
    /// </summary>
    public string Password { get; set; } = default!;
}