namespace RussianSpotify.Contracts.Requests.Account.PostRegister;

public class PostRegisterResponse
{
    /// <summary>
    /// Почта пользователя
    /// </summary>
    public string Email { get; set; } = default!;
}