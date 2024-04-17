using RussianSpotify.Contracts.Requests.Playlist.GetAllFavouriteAlbumAndPlaylist;

namespace RussianSpotify.Contracts.Requests.Playlist.GetPlaylistsByFilter;

public class GetPlaylistsByFilterResponse
{
    public GetPlaylistsByFilterResponse(List<GetPlaylistsByFilterResponseItem> entities, int totalCount)
    {
        Entities = entities;
        TotalCount = totalCount;
    }
    
    public List<GetPlaylistsByFilterResponseItem> Entities { get; set; }
    
    public int TotalCount { get; set; }
}