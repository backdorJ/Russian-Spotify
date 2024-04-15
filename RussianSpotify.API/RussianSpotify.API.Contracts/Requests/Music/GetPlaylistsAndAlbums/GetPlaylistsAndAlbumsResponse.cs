namespace RussianSpotify.Contracts.Requests.Music.GetPlaylistsAndAlbums;

/// <summary>
/// Ответ на запрос о получение любимых альбомов/плейлистов
/// </summary>
public class GetPlaylistsAndAlbumsResponse
{
    public GetPlaylistsAndAlbumsResponse(
        List<GetPlaylistsAndAlbumsResponseItem> entities,
        int totalCount)
    {
        Entities = entities;
        TotalCount = totalCount;
    }

    /// <summary>
    /// Список альбомов/плейлиство
    /// </summary>
    public List<GetPlaylistsAndAlbumsResponseItem> Entities { get; set; }

    /// <summary>
    /// Общее кол-во
    /// </summary>
    public int TotalCount { get; set; }
}