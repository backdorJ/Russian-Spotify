namespace RussianSpotify.Contracts.Requests.Music.EditSong;

/// <summary>
/// Запрос на обновление песни
/// </summary>
public class EditSongRequest
{
    public EditSongRequest()
    {
        
    }

    public EditSongRequest(EditSongRequest request)
    {
        SongId = request.SongId;
        SongName = request.SongName;
        Category = request.Category;
        Duration = request.Duration;
        ImageId = request.ImageId;
    }
    
    public Guid SongId { get; set; }
    public string? SongName { get; set; }
    public int? Category { get; set; }
    public double? Duration { get; set; }
    public Guid? ImageId { get; set; }
}