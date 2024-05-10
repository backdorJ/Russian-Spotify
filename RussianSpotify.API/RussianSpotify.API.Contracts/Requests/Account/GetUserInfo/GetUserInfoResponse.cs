namespace RussianSpotify.Contracts.Requests.Account.GetUserInfo;

/// <summary>
/// Ответ для запроса на получение информации о пользователе
/// </summary>
public class GetUserInfoResponse
{
    /// <summary>
    /// Id пользователя
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Имя пользователя
    /// </summary>
    public string UserName { get; set; } = default!;

    /// <summary>
    /// Почта
    /// </summary>
    public string Email { get; set; } = default!;

    /// <summary>
    /// Роли пользователя
    /// </summary>
    public List<string> Roles { get; set; } = new();

    /// <summary>
    /// Id фото в профиле юзера
    /// </summary>
    public Guid? UserPhotoId { get; set; } = default!;
}