namespace RussianSpotify.Contracts.Requests.Music.AddSongImage;

public class AddSongImageRequest
{
    public AddSongImageRequest()
    {
        
    }

    public AddSongImageRequest(AddSongImageRequest request)
    {
        SongId = request.SongId;
        ImageId = request.ImageId;
    }

    public Guid SongId { get; set; }
    public Guid ImageId { get; set; }
}