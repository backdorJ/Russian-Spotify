namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Песня
/// </summary>
public class Song
{
    /// <summary>
    /// Конструктор
    /// </summary>
    public Song()
    {
        Authors = new List<User>();
        Buckets = new List<Bucket>();
    }
    
    /// <summary>
    /// Ид сущности
    /// </summary>
    public Guid Id { get; protected set; }

    /// <summary>
    /// Имя песни
    /// </summary>
    public string SongName { get; protected set; } = default!;

    /// <summary>
    /// Длительность
    /// </summary>
    public double Duration { get; protected set; }

    /// <summary>
    /// Ид альбома
    /// </summary>
    public Guid? AlbumId { get; protected set; }
    
    /// <summary>
    /// Nav-prop Альбома
    /// </summary>
    public Album? Album { get; protected set; }

    /// <summary>
    /// Авторы
    /// </summary>
    public List<User> Authors { get; protected set; }

    /// <summary>
    /// Ид категории
    /// </summary>
    public Guid CategoryId { get; protected set; }
    
    /// <summary>
    /// Nav-prop категории
    /// </summary>
    public Category Category { get; protected set; }

    /// <summary>
    /// Файл
    /// </summary>
    public File File { get; protected set; }

    /// <summary>
    /// ИД файла
    /// </summary>
    public Guid FileId { get; protected set; }

    /// <summary>
    /// Корзины
    /// </summary>
    public List<Bucket> Buckets { get; protected set; }
}