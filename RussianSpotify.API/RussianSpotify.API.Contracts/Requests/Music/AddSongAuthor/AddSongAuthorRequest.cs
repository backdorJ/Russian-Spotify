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
        AuthorId = request.AuthorId;
        SongId = request.SongId;
    }

    /// <summary>
    /// Id автора
    /// </summary>
    public Guid AuthorId { get; }
    
    /// <summary>
    /// Id песни
    /// </summary>
    public Guid SongId { get; }
}