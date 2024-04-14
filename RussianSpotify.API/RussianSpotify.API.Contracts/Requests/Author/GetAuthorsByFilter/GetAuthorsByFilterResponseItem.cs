namespace RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

public class GetAuthorsByFilterResponseItem
{
    public Guid AuthorId { get; set; }
    public string AuthorName { get; set; } = null!;
    public Guid ImageId { get; set; }
    public List<GetAuthorsByFilterResponseItemPlaylist> Albums { get; set; } = new();
    public int TotalAlbumCount { get; set; }
}