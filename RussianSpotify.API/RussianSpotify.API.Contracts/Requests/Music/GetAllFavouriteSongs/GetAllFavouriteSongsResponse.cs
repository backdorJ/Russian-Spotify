namespace RussianSpotify.Contracts.Requests.Music.GetAllFavouriteSongs;

/// <summary>
/// Ответ на запрос о любимых песнях
/// </summary>
public class GetAllFavouriteSongsResponse
{
    public GetAllFavouriteSongsResponse(
        List<GetAllFavouriteSongsResponseItem>? entities,
        int totalCount)
    {
        Entities = entities;
        TotalCount = totalCount;
    }
    
    /// <summary>
    /// Любимые песни
    /// </summary>
    public List<GetAllFavouriteSongsResponseItem>? Entities { get; set; }

    /// <summary>
    /// Общее кол-во
    /// </summary>
    public int TotalCount { get; set; }
}