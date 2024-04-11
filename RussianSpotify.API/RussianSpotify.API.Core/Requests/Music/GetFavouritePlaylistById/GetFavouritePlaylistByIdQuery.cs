using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetFavouritePlaylistById;

namespace RussianSpotify.API.Core.Requests.Music.GetFavouritePlaylistById;

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