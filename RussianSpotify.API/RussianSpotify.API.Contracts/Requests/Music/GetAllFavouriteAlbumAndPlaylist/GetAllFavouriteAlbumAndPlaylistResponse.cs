namespace RussianSpotify.Contracts.Requests.Music.GetAllFavouriteAlbumAndPlaylist;

/// <summary>
/// Ответ на запрос о получение любимых альбомов/плейлистов
/// </summary>
public class GetAllFavouriteAlbumAndPlaylistResponse
{
    /// <summary>
    /// Название плейлиста/альбома
    /// </summary>
    public string PlaylistName { get; set; } = default!;

    /// <summary>
    /// ИД картинки
    /// </summary>
    public Guid? ImageId { get; set; }

    /// <summary>
    /// Это альбом
    /// </summary>
    public bool IsAlbum { get; set; }

    /// <summary>
    /// Автор
    /// </summary>
    public string? AuthorName { get; set; }

    /// <summary>
    /// Дата релиза
    /// </summary>
    public DateTime ReleaseDate { get; set; }
}