namespace RussianSpotify.Contracts.Requests.Music.AddSongAuthor;

public class AddSongAuthorRequest
{
    public AddSongAuthorRequest()
    {
        
    }
    
    public AddSongAuthorRequest(AddSongAuthorRequest request)
    {
        AuthorId = request.AuthorId;
        SongId = request.SongId;
    }

    public Guid AuthorId { get; set; }
    public Guid SongId { get; set; }
}