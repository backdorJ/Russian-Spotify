namespace RussianSpotify.Contracts.Requests.Music.DeleteSong;

/// <summary>
/// Запрос на удаление песни
/// </summary>
public class DeleteSongRequest
{
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public DeleteSongRequest()
    {
        
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public DeleteSongRequest(DeleteSongRequest request)
    {
        SongId = request.SongId;
    }
    
    /// <summary>
    /// Id песни
    /// </summary>
    public Guid SongId { get; set; }
}