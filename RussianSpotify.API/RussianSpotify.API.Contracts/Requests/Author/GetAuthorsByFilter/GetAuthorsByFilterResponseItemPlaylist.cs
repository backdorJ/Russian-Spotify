namespace RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

public class GetAuthorsByFilterResponseItemPlaylist
{
    public Guid PlaylistId { get; set; }
    public string PlaylistName { get; set; } = null!;
}