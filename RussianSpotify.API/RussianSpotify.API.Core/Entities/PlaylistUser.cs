namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Link-таблица между <see cref="User"/> и <see cref="Playlist"/> для добавленных в избранные плейлистов
/// </summary>
public class PlaylistUser
{
    /// <summary>
    /// Id плейлиста
    /// </summary>
    public Guid PlaylistId { get; set; }

    /// <summary>
    /// Плейлист
    /// </summary>
    public Playlist Playlist { get; set; } = null!;

    /// <summary>
    /// Id пользователя
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Пользователь
    /// </summary>
    public User User { get; set; } = null!;

    /// <summary>
    /// Дата добавления в избранные
    /// </summary>
    public DateTime AddedDate { get; set; } = DateTime.UtcNow;
}