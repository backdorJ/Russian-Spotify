using MediatR;

namespace RussianSpotify.API.Core.Requests.Playlist.RemovePlaylistFromFavorite;

/// <summary>
/// Команда на удаление плейлиста из любимых
/// </summary>
public class RemovePlaylistFromFavoriteCommand : IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="playlistId">ИД плейлиста</param>
    public RemovePlaylistFromFavoriteCommand(Guid playlistId)
        => PlaylistId = playlistId;

    /// <summary>
    /// ИД плейлиста
    /// </summary>
    public Guid PlaylistId { get; set; }
}