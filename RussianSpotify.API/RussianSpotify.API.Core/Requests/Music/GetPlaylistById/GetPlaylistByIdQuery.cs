using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetFavouritePlaylistById;

namespace RussianSpotify.API.Core.Requests.Music.GetPlaylistById;

public class GetPlaylistByIdQuery : IRequest<GetFavouritePlaylistByIdResponse>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="playlistId">ИД плейлиста</param>
    public GetPlaylistByIdQuery(Guid playlistId)
        => PlaylistId = playlistId;
    
    /// <summary>
    /// ИД альбома/плейлиста
    /// </summary>
    public Guid PlaylistId { get; set; }
}