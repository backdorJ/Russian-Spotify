namespace RussianSpotify.Contracts.Requests.Playlist.PutPlaylist;

/// <summary>
/// Запрос на изменение альбома/плейлиста
/// </summary>
public class PutPlaylistRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    public PutPlaylistRequest()
    {
    }

    public PutPlaylistRequest(PutPlaylistRequest request)
    {
        PlaylistName = request.PlaylistName;
        ImageId = request.ImageId;
        SongsIds = request.SongsIds;
    }

    /// <summary>
    /// Название
    /// </summary>
    public string? PlaylistName { get; set; }

    /// <summary>
    /// ИД фото
    /// </summary>
    public Guid? ImageId { get; set; }

    /// <summary>
    /// ИД песней
    /// </summary>
    public List<Guid>? SongsIds { get; set; }
}