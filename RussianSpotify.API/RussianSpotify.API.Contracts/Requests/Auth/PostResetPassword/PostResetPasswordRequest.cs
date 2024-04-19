namespace RussianSpotify.Contracts.Requests.Auth.PostResetPassword;

/// <summary>
/// Запрос на сброс пароля
/// </summary>
public class PostResetPasswordRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">PostResetPasswordRequest</param>
    public PostResetPasswordRequest(PostResetPasswordRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        Email = request.Email;
    }
    
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public PostResetPasswordRequest()
    {
    }
    
    /// <summary>
    /// Email пользователя
    /// </summary>
    public string Email { get; set; } = default!;
}