namespace RussianSpotify.Contracts.Requests.Playlist.PostCreatePlaylist;

public class PostCreatePlaylistResponse
{
    public string PlaylistName { get; set; } = null!;
    public Guid PlaylistId { get; set; }
}