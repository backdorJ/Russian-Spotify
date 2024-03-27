namespace RussianSpotify.Contracts.Requests.Account.PatchUpdateUserInfo;

/// <summary>
/// Ответ на запрос на обновление данных о пользователе
/// </summary>
public class PatchUpdateUserInfoResponse
{
    /// <summary>
    /// JWT
    /// </summary>
    public string AccessToken { get; set; } = default!;

    /// <summary>
    /// Refresh Token
    /// </summary>
    public string RefreshToken { get; set; } = default!;
}