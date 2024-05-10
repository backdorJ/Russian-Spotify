using MediatR;

namespace RussianSpotify.API.Core.Requests.Playlist.PostAddPlaylistToFavourite;

/// <summary>
/// Команда на добавление альбома/плейлиста в любимые
/// </summary>
public class PostAddPlaylistToFavouriteCommand : IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="playlistId">Ид плейлиста/альбома</param>
    public PostAddPlaylistToFavouriteCommand(Guid playlistId)
        => PlaylistId = playlistId;

    /// <summary>
    /// ИД плейлиста/альбома
    /// </summary>
    public Guid PlaylistId { get; set; }
}