namespace RussianSpotify.Contracts.Requests.Music.GetSongsByFilter;

/// <summary>
/// Отфильтрованные песни
/// </summary>
public class GetSongsByFilterResponse
{
    public GetSongsByFilterResponse(List<GetSongsByFilterResponseItem> entities, int totalCount)
    {
        Entities = entities;
        TotalCount = totalCount;
    }
    
    /// <summary>
    /// Отфильтрованные песни
    /// </summary>
    public List<GetSongsByFilterResponseItem> Entities { get; set; }
    
    /// <summary>
    /// Общее кол-во подобных треков
    /// </summary>
    public int TotalCount { get; set; }
}