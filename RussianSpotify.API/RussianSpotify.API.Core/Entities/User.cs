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
        AuthorAlbums = new();
        Songs = new();
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
    public Bucket? Bucket { get; protected set; }
    
    /// <summary>
    /// Подписка
    /// </summary>
    public Subscribe? Subscribe { get; protected set; }

    /// <summary>
    /// Альбомы авторов
    /// </summary>
    public List<Album>? AuthorAlbums { get; protected set; }

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