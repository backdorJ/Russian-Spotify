using MediatR;
using RussianSpotify.Contracts.Models;
using RussianSpotify.Contracts.Requests.Playlist.GetAllFavouriteAlbumAndPlaylist;

namespace RussianSpotify.API.Core.Requests.Playlist.GetAllFavouriteAlbumAndPlaylist;

/// <summary>
/// Запрос на получения любимых альбомов/плейлистов
/// </summary>
public class GetAllFavouriteAlbumAndPlaylistQuery
    : GetAllFavouriteAlbumAndPlaylistRequest, IRequest<GetAllFavouriteAlbumAndPlaylistResponse>, IPaginationFilter
{
}