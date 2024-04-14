using MediatR;
using RussianSpotify.Contracts.Models;
using RussianSpotify.Contracts.Requests.Music.GetPlaylistsAndAlbums;

namespace RussianSpotify.API.Core.Requests.Music.GetPlaylistsAndAlbums;

/// <summary>
/// Запрос на получения любимых альбомов/плейлистов
/// </summary>
public class GetPlaylistsAndAlbumsQuery
    : GetPlaylistsAndAlbumsRequest, IRequest<GetPlaylistsAndAlbumsResponse>, IPaginationFilter
{
    public GetPlaylistsAndAlbumsQuery(GetPlaylistsAndAlbumsRequest request)
        : base(request)
    {
    }
}