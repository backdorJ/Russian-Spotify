namespace RussianSpotify.Contracts.Requests.Playlist.DeletePlaylist;

/// <summary>
/// Ответ на запрос <see cref="DeletePlaylistRequest"/>
/// </summary>
public class DeletePlaylistResponse
{
    /// <summary>
    /// Id плейлиста
    /// </summary>
    public Guid PlaylistId { get; set; }

    /// <summary>
    /// Название плейлиста
    /// </summary>
    public string PlaylistName { get; set; } = null!;
}