namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Альбом  
/// </summary>
public class Album
{
    /// <summary>
    /// Конструктор
    /// </summary>
    public Album()
    {
        Songs = new List<Song>();
    }
    
    /// <summary>
    /// Ид альбома
    /// </summary>
    public Guid Id { get; protected set; }

    /// <summary>
    /// Название альбома
    /// </summary>
    public string AlbumName { get; protected set; } = default!;

    /// <summary>
    /// Ид автора
    /// </summary>
    public Guid AuthorId { get; protected set; }

    /// <summary>
    /// Nav-prop автора
    /// </summary>
    public User? Author { get; protected set; }

    /// <summary>
    /// Дата опубликования
    /// </summary>
    public DateTime ReleaseDate { get; protected set; }

    /// <summary>
    /// Песни
    /// </summary>
    public List<Song>? Songs { get; protected set; }
}