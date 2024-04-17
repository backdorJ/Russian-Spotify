namespace RussianSpotify.Contracts.Requests.Playlist.PostCreatePlaylist;

/// <summary>
/// Запрос на создание плейлиста и добавление музыки
/// </summary>
public class PostCreatePlaylistRequest
{
    /// <summary>
    /// Констркутор
    /// </summary>
    public PostCreatePlaylistRequest()
    {
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public PostCreatePlaylistRequest(PostCreatePlaylistRequest request)
    {
        PlaylistName = request.PlaylistName;
        ImageId = request.ImageId;
        SongIds = request.SongIds;
        IsAlbum = request.IsAlbum;
    }
    
    /// <summary>
    /// Название плейлиста
    /// </summary>
    public string PlaylistName { get; set; } = default!;

    /// <summary>
    /// Картинка плейлиста
    /// </summary>
    public Guid ImageId { get; set; }

    /// <summary>
    /// Песни
    /// </summary>
    public List<Guid> SongIds { get; set; } = new();

    /// <summary>
    /// Это альбом
    /// </summary>
    public bool IsAlbum { get; set; }
}