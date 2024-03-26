namespace RussianSpotify.Contracts.Requests.Account.PatchUpdateUserInfo;

public class PatchUpdateUserInfoResponse
{
    public string AccessToken { get; set; } = default!;

    public string RefreshToken { get; set; } = default!;
}