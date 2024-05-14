namespace RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

/// <summary>
/// Сущность ответа <see cref="GetAuthorsByFilterResponse"/>
/// </summary>
public class GetAuthorsByFilterResponseItem
{
    /// <summary>
    /// Id автора
    /// </summary>
    public Guid AuthorId { get; set; }

    /// <summary>
    /// Имя автора
    /// </summary>
    public string AuthorName { get; set; } = null!;

    /// <summary>
    /// Id картинки автора
    /// </summary>
    public Guid ImageId { get; set; }

    /// <summary>
    /// Список альбомов <see cref="GetAuthorsByFilterResponseItemPlaylist"/>
    /// </summary>
    public List<GetAuthorsByFilterResponseItemPlaylist> Albums { get; set; } = new();

    /// <summary>
    /// Общее количество альбомов автора
    /// </summary>
    public int TotalAlbumCount { get; set; }
}