namespace RussianSpotify.Contracts.Requests.Music.DeleteSongAuthor;

/// <summary>
/// Ответ на запрос на удаление автора песни
/// </summary>
public class DeleteSongAuthorResponse
{
    /// <summary>
    /// Id песни
    /// </summary>
    public Guid SongId { get; set; }

    /// <summary>
    /// Id автора
    /// </summary>
    public Guid AuthorId { get; set; }
}