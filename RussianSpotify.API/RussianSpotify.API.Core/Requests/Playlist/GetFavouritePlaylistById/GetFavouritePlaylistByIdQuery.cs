using MediatR;
using RussianSpotify.Contracts.Requests.Playlist.GetFavouritePlaylistById;

namespace RussianSpotify.API.Core.Requests.Playlist.GetFavouritePlaylistById;

public class GetFavouritePlaylistByIdQuery : IRequest<GetFavouritePlaylistByIdResponse>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="playlistId">ИД плейлиста</param>
    public GetFavouritePlaylistByIdQuery(Guid playlistId)
        => PlaylistId = playlistId;
    
    /// <summary>
    /// ИД альбома/плейлиста
    /// </summary>
    public Guid PlaylistId { get; set; }
}