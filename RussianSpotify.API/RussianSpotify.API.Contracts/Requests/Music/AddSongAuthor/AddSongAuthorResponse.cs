namespace RussianSpotify.Contracts.Requests.Music.AddSongAuthor;

/// <summary>
/// Ответ на запрос на добавление нового автора песни
/// </summary>
public class AddSongAuthorResponse
{
    /// <summary>
    /// Id песни
    /// </summary>
    public Guid SongId { get; set; }

    /// <summary>
    /// Id автора
    /// </summary>
    public Guid AuthorId { get; set; }

    /// <summary>
    /// Имя автора
    /// </summary>
    public string AuthorName { get; set; } = null!;
}