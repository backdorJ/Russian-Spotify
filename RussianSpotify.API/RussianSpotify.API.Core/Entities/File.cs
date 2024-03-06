namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Файл
/// </summary>
public class File
{
    /// <summary>
    /// Ид файла
    /// </summary>
    public Guid Id { get; protected set; }

    /// <summary>
    /// Адрес на песню в cloud
    /// </summary>
    public string Address { get; protected set; } = default!;

    /// <summary>
    /// Размер файла
    /// </summary>
    public long Size { get; protected set; }

    /// <summary>
    /// Название файла
    /// </summary>
    public string? FileName { get; protected set; }

    /// <summary>
    /// Тип файла
    /// </summary>
    public string? ContentType { get; protected set; }

    /// <summary>
    /// Песни
    /// </summary>
    public List<Song> Songs { get; protected set; }
}