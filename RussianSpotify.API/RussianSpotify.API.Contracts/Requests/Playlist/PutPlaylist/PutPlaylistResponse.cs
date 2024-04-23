namespace RussianSpotify.Contracts.Requests.Playlist.PutPlaylist;

/// <summary>
/// Ответ на команду <see cref="PutPlaylistRequest"/>
/// </summary>
public class PutPlaylistResponse
{
    /// <summary>
    /// Название плейлиста
    /// </summary>
    public string PlaylistName { get; set; } = null!;

    /// <summary>
    /// Id плейлиста
    /// </summary>
    public Guid PlaylistId { get; set; }
}