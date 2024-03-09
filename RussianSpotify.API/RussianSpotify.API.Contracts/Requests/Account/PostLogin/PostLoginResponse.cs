namespace RussianSpotify.Contracts.Requests.Account.PostLogin;

/// <summary>
/// Результат логина для PostLogin
/// </summary>
public class PostLoginResponse
{
    /// <summary>
    /// JWT
    /// </summary>
    public string Token { get; set; } = default!;
}