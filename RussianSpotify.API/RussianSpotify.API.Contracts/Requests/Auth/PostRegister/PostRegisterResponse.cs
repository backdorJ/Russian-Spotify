namespace RussianSpotify.Contracts.Requests.Auth.PostRegister;

public class PostRegisterResponse
{
    /// <summary>
    /// Почта пользователя
    /// </summary>
    public string Email { get; set; } = default!;
}