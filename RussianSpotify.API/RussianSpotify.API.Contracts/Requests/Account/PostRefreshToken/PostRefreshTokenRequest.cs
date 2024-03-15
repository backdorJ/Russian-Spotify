namespace RussianSpotify.Contracts.Requests.Account.PostRefreshToken;

public class PostRefreshTokenRequest
{
    public PostRefreshTokenRequest(PostRefreshTokenRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        AccessToken = request.AccessToken;
        RefreshToken = request.RefreshToken;
    }

    public PostRefreshTokenRequest()
    {
    }
    
    /// <summary>
    /// JWT
    /// </summary>
    public string AccessToken { get; set; } = default!;

    /// <summary>
    /// Токен для обновления JWT
    /// </summary>
    public string RefreshToken { get; set; } = default!;
}