namespace RussianSpotify.Contracts.Requests.Playlist.PutPlaylist;

public class PutPlaylistResponse
{
    public string PlaylistName { get; set; } = null!;
    public Guid PlaylistId { get; set; }
}