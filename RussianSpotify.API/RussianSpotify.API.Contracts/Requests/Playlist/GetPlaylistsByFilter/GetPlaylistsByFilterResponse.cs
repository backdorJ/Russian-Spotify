namespace RussianSpotify.Contracts.Requests.Playlist.GetPlaylistsByFilter;

/// <summary>
/// Отфильтрованные плейлисты
/// </summary>
public class GetPlaylistsByFilterResponse
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="entities">Отфильтрованные плейлисты</param>
    /// <param name="totalCount">Общее кол-во таких плейлистов</param>
    public GetPlaylistsByFilterResponse(List<GetPlaylistsByFilterResponseItem> entities, int totalCount)
    {
        Entities = entities;
        TotalCount = totalCount;
    }
    
    /// <summary>
    /// Отфильтрованные плейлисты
    /// </summary>
    public List<GetPlaylistsByFilterResponseItem> Entities { get; set; }
    
    /// <summary>
    /// Общее кол-во таких плейлистов
    /// </summary>
    public int TotalCount { get; set; }
}