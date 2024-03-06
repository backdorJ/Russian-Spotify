namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Корзина пользователя
/// </summary>
public class Bucket
{
    /// <summary>
    /// Ид пользователя
    /// </summary>
    public Guid Id { get; protected set; }
    
    /// <summary>
    /// Пользователь
    /// </summary>
    public User User { get; protected set; }

    /// <summary>
    /// Ид пользователя
    /// </summary>
    public Guid UserId { get; protected set; }
    
    /// <summary>
    /// Песни
    /// </summary>
    public List<Song> Songs { get; protected set; } 
}