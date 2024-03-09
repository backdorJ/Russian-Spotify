namespace RussianSpotify.Contracts.Requests.Account.PostLogin;

/// <summary>
/// Запрос на логин для PostLogin
/// </summary>
public class PostLoginRequest
{
    public string Email { get; set; } = default!;

    public string Password { get; set; } = default!;
}