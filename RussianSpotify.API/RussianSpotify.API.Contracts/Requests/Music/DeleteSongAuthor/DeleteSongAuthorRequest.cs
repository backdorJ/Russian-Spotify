namespace RussianSpotify.Contracts.Requests.Music.RemoveSongAuthor;

public class RemoveSongAuthorRequest
{
    public RemoveSongAuthorRequest()
    {
        
    }

    public RemoveSongAuthorRequest(RemoveSongAuthorRequest request)
    {
        SongId = request.SongId;
        AuthorId = request.AuthorId;
    }
    
    public Guid SongId { get; set; }
    public Guid AuthorId { get; set; }
}