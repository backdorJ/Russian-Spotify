namespace RussianSpotify.Contracts.Requests.Auth.PostRefreshToken;

public class PostRefreshTokenResponse
{
    /// <summary>
    /// JWT
    /// </summary>
    public string AccessToken { get; set; } = default!;

    /// <summary>
    /// Токен для обновления JWT
    /// </summary>
    public string RefreshToken { get; set; } = default!;
}