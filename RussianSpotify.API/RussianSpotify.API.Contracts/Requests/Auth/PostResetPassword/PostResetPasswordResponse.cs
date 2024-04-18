namespace RussianSpotify.Contracts.Requests.Auth.PostResetPassword;

public class PostResetPasswordResponse
{
    /// <summary>
    /// Почта пользователя
    /// </summary>
    public string Email { get; set; } = default!;
}