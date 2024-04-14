namespace RussianSpotify.Contracts.Requests.Music.GetPlaylistsAndAlbums;

/// <summary>
/// Элемент списка для <see cref="GetPlaylistsAndAlbumsResponse"/>
/// </summary>
public class GetPlaylistsAndAlbumsResponseItem
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