namespace RussianSpotify.Contracts.Requests.Account.PatchUpdateUserInfo;

/// <summary>
/// Запрос на обновление данных о пользователе
/// </summary>
public class PatchUpdateUserInfoRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">PatchUpdateUserInfoRequest</param>
    public PatchUpdateUserInfoRequest(PatchUpdateUserInfoRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        UserName = request.UserName;
        NewPassword = request.NewPassword;
        NewPasswordConfirm = request.NewPasswordConfirm;
        CurrentPassword = request.CurrentPassword;
        FilePhotoId = request.FilePhotoId;
    }

    public PatchUpdateUserInfoRequest()
    {
    } 
    
    /// <summary>
    /// Имя пользователя
    /// </summary>
    public string? UserName { get; set; }
    
    /// <summary>
    /// Текущий пароль
    /// </summary>
    public string? CurrentPassword { get; set; }
    
    /// <summary>
    /// Новый пароль
    /// </summary>
    public string? NewPassword { get; set; }
    
    /// <summary>
    /// Подтверждение нового пароля
    /// </summary>
    public string? NewPasswordConfirm { get; set; }
    
    /// <summary>
    /// Id файла фотографии
    /// </summary>
    public Guid? FilePhotoId { get; set; }
}