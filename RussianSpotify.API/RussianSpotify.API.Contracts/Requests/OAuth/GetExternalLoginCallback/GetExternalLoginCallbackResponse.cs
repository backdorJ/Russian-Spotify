namespace RussianSpotify.Contracts.Requests.OAuthAccount.GetExternalLoginCallback;

public class GetExternalLoginCallbackResponse
{
    public string AccessToken { get; set; } = default!;

    public string RefreshToken { get; set; } = default!;
}