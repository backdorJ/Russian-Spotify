namespace RussianSpotify.Contracts.Requests.Playlist.DeletePlaylist;

/// <summary>
/// Запрос на удаление Плейлиста
/// </summary>
public class DeletePlaylistRequest
{
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public DeletePlaylistRequest()
    {
        
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public DeletePlaylistRequest(DeletePlaylistRequest request)
    {
        PlaylistId = request.PlaylistId;
    }
    
    /// <summary>
    /// Id плейлиста
    /// </summary>
    public Guid PlaylistId { get; set; }
}