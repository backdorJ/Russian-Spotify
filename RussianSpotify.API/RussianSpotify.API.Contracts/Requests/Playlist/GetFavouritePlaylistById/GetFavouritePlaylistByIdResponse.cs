namespace RussianSpotify.Contracts.Requests.Playlist.GetFavouritePlaylistById;

/// <summary>
/// Ответ на запрос любимого альбома/плейлиста
/// </summary>
public class GetFavouritePlaylistByIdResponse
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
    public DateTime? ReleaseDate { get; set; }
    
    /// <summary>
    /// Находится ли альбом в избранном
    /// </summary>
    public bool IsInFavorite { get; set; }
}