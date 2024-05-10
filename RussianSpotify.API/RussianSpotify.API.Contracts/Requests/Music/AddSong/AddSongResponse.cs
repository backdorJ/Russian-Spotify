namespace RussianSpotify.Contracts.Requests.Music.AddSong;

/// <summary>
/// Response for adding new Song
/// </summary>
public class AddSongResponse
{
    /// <summary>
    /// Song Id
    /// </summary>
    public Guid SongId { get; set; }

    /// <summary>
    /// Song Name
    /// </summary>
    public string SongName { get; set; } = null!;
}