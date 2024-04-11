using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetAllFavouriteAlbumAndPlaylist;

namespace RussianSpotify.API.Core.Requests.Music.GetAllFavouriteAlbumAndPlaylist;

/// <summary>
/// Запрос на получения любимых альбомов/плейлистов
/// </summary>
public class GetAllFavouriteAlbumAndPlaylistQuery : IRequest<List<GetAllFavouriteAlbumAndPlaylistResponse>>
{
}