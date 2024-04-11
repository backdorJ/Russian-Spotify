namespace RussianSpotify.Contracts.Requests.Music.GetAllFavouriteAlbumAndPlaylist;

/// <summary>
/// Элемент списка для <see cref="GetAllFavouriteAlbumAndPlaylistResponse"/>
/// </summary>
public class GetAllFavouriteAlbumAndPlaylistResponseItem
{
    /// <summary>
    /// ИД плейлиста/альбома
    /// </summary>
    public Guid Id { get; set; }
    
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