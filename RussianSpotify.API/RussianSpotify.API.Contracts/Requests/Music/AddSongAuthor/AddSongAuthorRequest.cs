namespace RussianSpotify.Contracts.Requests.Music.AddSongAuthor;

/// <summary>
/// Запрос на добавление автора песни
/// </summary>
public class AddSongAuthorRequest
{
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public AddSongAuthorRequest()
    {
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    protected AddSongAuthorRequest(AddSongAuthorRequest request)
    {
        AuthorEmail = request.AuthorEmail;
        SongId = request.SongId;
    }

    /// <summary>
    /// Id автора
    /// </summary>
    public string AuthorEmail { get; set; }

    /// <summary>
    /// Id песни
    /// </summary>
    public Guid SongId { get; set; }
}