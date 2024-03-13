namespace RussianSpotify.Contracts.Requests.OAuthAccount;

public class GetExternalLoginCallbackResponse
{
    public string AccessToken { get; set; } = default!;

    public string RefreshToken { get; set; } = default!;

    public bool IsRegistered { get; set; } = default!;
}