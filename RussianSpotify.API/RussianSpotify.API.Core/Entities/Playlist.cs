namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Альбом  
/// </summary>
public class Playlist
{
    /// <summary>
    /// Конструктор
    /// </summary>
    public Playlist()
    {
        Songs = new List<Song>();
        Users = new List<User>();
    }
    
    /// <summary>
    /// Ид альбома
    /// </summary>
    public Guid Id { get; protected set; }

    /// <summary>
    /// Название плейлиста
    /// </summary>
    public string PlaylistName { get; protected set; } = default!;

    /// <summary>
    /// Картинка
    /// </summary>
    public File? Image { get; set; }

    /// <summary>
    /// ИД картинки
    /// </summary>
    public Guid? ImageId { get; set; }

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
    /// Количество прослушиваний плейлиста
    /// </summary>
    public uint PlaysNumber { get; set; }

    /// <summary>
    /// Песни
    /// </summary>
    public List<Song>? Songs { get; protected set; }

    /// <summary>
    /// Лайкнувшие пользователи
    /// </summary>
    public List<User>? Users { get; protected set; }

    /// <summary>
    /// Является ли альбомом
    /// </summary>
    public bool IsAlbum { get; set; }
}