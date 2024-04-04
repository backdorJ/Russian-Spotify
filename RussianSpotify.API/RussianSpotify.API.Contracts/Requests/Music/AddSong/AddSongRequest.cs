namespace RussianSpotify.Contracts.Requests.Music.AddSong;

public class AddSongRequest
{
    public AddSongRequest()
    {
        
    }
    
    public AddSongRequest(AddSongRequest request)
    {
        SongName = request.SongName;
        Duration = request.Duration;
        Category = request.Category;
        ImageId = request.ImageId;
    }
    
    public string SongName { get; set; } = null!;
    public double Duration { get; set; }
    public int Category { get; set; }
    public Guid? ImageId { get; set; }
}