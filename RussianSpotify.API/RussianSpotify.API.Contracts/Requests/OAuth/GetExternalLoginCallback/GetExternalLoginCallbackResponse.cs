namespace RussianSpotify.Contracts.Requests.OAuth.GetExternalLoginCallback;

public class GetExternalLoginCallbackResponse
{
    public string AccessToken { get; set; } = default!;

    public string RefreshToken { get; set; } = default!;
}