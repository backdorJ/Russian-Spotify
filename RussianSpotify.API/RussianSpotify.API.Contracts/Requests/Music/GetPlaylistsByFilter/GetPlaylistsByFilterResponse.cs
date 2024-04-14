namespace RussianSpotify.Contracts.Requests.Music.GetPlaylistsByFilter;

public class GetPlaylistsByFilterResponse
{
    /// <summary>
    /// Название альбома
    /// </summary>
    public string PlaylistName { get; set; } = default!;

    /// <summary>
    /// ИД картинки
    /// </summary>
    public Guid? ImageId { get; set; }

    /// <summary>
    /// Автор
    /// </summary>
    public string? AuthorName { get; set; }

    /// <summary>
    /// Дата релиза
    /// </summary>
    public DateTime ReleaseDate { get; set; }
}