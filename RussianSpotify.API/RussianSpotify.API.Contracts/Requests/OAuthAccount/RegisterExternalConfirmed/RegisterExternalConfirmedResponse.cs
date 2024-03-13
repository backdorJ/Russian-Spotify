namespace RussianSpotify.Contracts.Requests.OAuthAccount.RegisterExternalConfirmed;

public class RegisterExternalConfirmedResponse
{
    public string AccessToken { get; set; } = default!;

    public string RefreshToken { get; set; } = default!;
}