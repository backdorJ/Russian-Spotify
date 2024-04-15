namespace RussianSpotify.Contracts.Requests.Playlist.GetAllFavouriteAlbumAndPlaylist;

/// <summary>
/// Ответ на запрос о получение любимых альбомов/плейлистов
/// </summary>
public class GetAllFavouriteAlbumAndPlaylistResponse
{
    public GetAllFavouriteAlbumAndPlaylistResponse(
        List<GetAllFavouriteAlbumAndPlaylistResponseItem> entities,
        int totalCount)
    {
        Entities = entities;
        TotalCount = totalCount;
    }

    /// <summary>
    /// Список альбомов/плейлиство
    /// </summary>
    public List<GetAllFavouriteAlbumAndPlaylistResponseItem> Entities { get; set; }

    /// <summary>
    /// Общее кол-во
    /// </summary>
    public int TotalCount { get; set; }
}