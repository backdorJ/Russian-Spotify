using Microsoft.AspNetCore.Identity;

namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Сущность пользователя
/// </summary>
public class User : IdentityUser<Guid>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    public User()
    {
        Playlists = new();
        Songs = new();
        Bucket = new();
    }

    /// <summary>
    /// JWT
    /// </summary>
    public string? AccessToken { get; set; }
    
    /// <summary>
    /// Токен для обновления JWT
    /// </summary>
    public string? RefreshToken { get; set; }
    
    /// <summary>
    /// Время жизни Refresh Token
    /// </summary>
    public DateTime? RefreshTokenExpiryTime { get; set; }
    
    /// <summary>
    /// Id фото в профиле юзера
    /// </summary>
    public Guid? UserPhotoId { get; set; }
    
    /// <summary>
    /// Фото в профиле юзера
    /// </summary>
    public File? UserPhoto { get; set; }

    /// <summary>
    /// Файлы, добавленные пользователем
    /// </summary>
    public List<File> Files { get; set; }
    
    /// <summary>
    /// День рождения пользователя
    /// </summary>
    public DateTime? Birthday { get; protected set; }

    /// <summary>
    /// Телефон пользователя
    /// </summary>
    public string? Phone { get; protected set; }

    /// <summary>
    /// Подтвержден
    /// </summary>
    public bool IsConfirmed { get; protected set; }

    /// <summary>
    /// Корзина
    /// </summary>
    public Bucket? Bucket { get; set; }
    
    /// <summary>
    /// Подписка
    /// </summary>
    public Subscribe? Subscribe { get; protected set; }

    /// <summary>
    /// Понравившиеся плейлисты
    /// </summary>
    public List<Playlist>? Playlists { get; protected set; }

    public List<Playlist> AuthorPlaylists { get; set; }

    /// <summary>
    /// Песни пользователя
    /// </summary>
    public List<Song>? Songs { get; protected set; }

    /// <summary>
    /// Создать тестовую сущность
    /// </summary>
    /// <param name="id">Ид пользователя</param>
    /// <param name="login">Логин пользователя</param>
    /// <param name="birthday">Дата рождения</param>
    /// <param name="email">E-mail пользователя</param>
    /// <param name="phone">Телефон</param>
    /// <param name="passwordHash">Хеш пароля</param>
    /// <returns></returns>
    [Obsolete("Только для тестов")]
    public static User CreateForTest(
        Guid? id = default,
        string login = default!,
        DateTime? birthday = default,
        string email = default!,
        string phone = default!,
        string? passwordHash = default)
        => new()
        {
            Id = id ?? Guid.NewGuid(),
            Birthday = birthday,
            Email = email,
            Phone = phone,
            PasswordHash = passwordHash
        };
}