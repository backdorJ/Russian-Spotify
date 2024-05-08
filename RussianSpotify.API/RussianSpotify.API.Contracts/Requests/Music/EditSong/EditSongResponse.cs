namespace RussianSpotify.Contracts.Requests.Music.EditSong;

/// <summary>
/// Ответ на запос на обновление Пенси
/// </summary>
public class EditSongResponse
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