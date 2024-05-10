namespace RussianSpotify.Contracts.Requests.Music.DeleteSong;

/// <summary>
/// Ответ на запрос <see cref="DeleteSongRequest"/>
/// </summary>
public class DeleteSongResponse
{
    /// <summary>
    /// Id песни
    /// </summary>
    public Guid SongId { get; set; }
    
    /// <summary>
    /// Название песни
    /// </summary>
    public string SongName { get; set; } = null!;
}