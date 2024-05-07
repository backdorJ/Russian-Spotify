namespace RussianSpotify.Contracts.Requests.Music.EditSong;

public class EditSongResponse
{
    public Guid SongId { get; set; }
    public string SongName { get; set; } = null!;
}