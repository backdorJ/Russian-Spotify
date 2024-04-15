using RussianSpotify.Contracts.Requests.Playlist.GetAllFavouriteAlbumAndPlaylist;

namespace RussianSpotify.Contracts.Requests.Playlist.GetPlaylistsByFilter;

public class GetPlaylistsByFilterResponse : GetAllFavouriteAlbumAndPlaylistResponse
{
    public GetPlaylistsByFilterResponse(List<GetAllFavouriteAlbumAndPlaylistResponseItem> entities, int totalCount)
        : base(entities, totalCount)
    {
    }
}