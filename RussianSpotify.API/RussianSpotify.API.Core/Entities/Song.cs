using System.Collections.Immutable;

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
        
    }
    
    public Song(string songName, double duration, Category category)
    {
        SongName = songName;
        Duration = duration;
        Category = category;
    }

    public void AddAuthor(User author)
    {
        Authors.Add(author);
    }

    public void SetImage(File image)
    {
        Image = image;
    }

    /// <summary>
    /// Ид сущности
    /// </summary>
    public Guid Id { get; protected set; }

    /// <summary>
    /// Имя песни
    /// </summary>
    public string SongName { get; protected set; }

    /// <summary>
    /// Длительность
    /// </summary>
    public double Duration { get; protected set; }

    /// <summary>
    /// Плейлисты, которым принадлежит песни
    /// </summary>
    public List<Playlist> Playlists { get; protected set; } = new();

    /// <summary>
    /// Авторы
    /// </summary>
    public List<User> Authors { get; protected set; } = new();

    /// <summary>
    /// Ид категории
    /// </summary>
    public Guid CategoryId { get; protected set; }

    /// <summary>
    /// Nav-prop категории
    /// </summary>
    public Category Category { get; protected set; }

    /// <summary>
    /// Файлы (тут музыка и картинка)
    /// </summary>
    public List<File> Files { get; set; } = new();

    /// <summary>
    /// Картинка
    /// </summary>
    public File? Image { get; protected set; }

    /// <summary>
    /// ИД файла картинки
    /// </summary>
    public Guid? ImageId { get; protected set; }

    /// <summary>
    /// Корзины
    /// </summary>
    public List<Bucket> Buckets { get; protected set; } = new();
}