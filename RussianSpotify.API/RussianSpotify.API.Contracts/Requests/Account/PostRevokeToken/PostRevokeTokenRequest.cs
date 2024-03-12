namespace RussianSpotify.Contracts.Requests.Account.PostRevokeToken;

public class PostRevokeTokenRequest
{
    /// <summary>
    /// Email пользователя
    /// </summary>
    public string Email { get; set; } = default!;
}