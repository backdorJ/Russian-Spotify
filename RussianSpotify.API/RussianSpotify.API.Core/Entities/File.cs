namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Файл
/// </summary>
public class File
{
    public File(
        string fileName,
        string contentType,
        string address,
        long size)
    {
        FileName = fileName;
        ContentType = contentType;
        Address = address;
        Size = size;
    }
    
    public File()
    {
    }
    
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
    /// Песня
    /// </summary>
    public Song? Song { get; protected set; }

    /// <summary>
    /// Плейлист
    /// </summary>
    public Playlist? Playlist { get; set; }
}