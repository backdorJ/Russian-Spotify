namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Корзина пользователя
/// </summary>
public class Bucket
{
    /// <summary>
    /// Ид пользователя
    /// </summary>
    public Guid Id { get; set; }
    
    /// <summary>
    /// Пользователь
    /// </summary>
    public User User { get; set; }

    /// <summary>
    /// Ид пользователя
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Песни
    /// </summary>
    public List<Song> Songs { get; set; } = new();
}