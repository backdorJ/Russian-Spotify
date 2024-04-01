namespace RussianSpotify.Contracts.Requests.Music.GetAllMusic;

/// <summary>
/// Ответ на запрос о получении всей музыки
/// </summary>
public class GetAllSongResponse
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="entities">Музыка</param>
    /// <param name="totalCount">Общее кол-во</param>
    public GetAllSongResponse(List<GetAllSongResponseItem> entities, int totalCount)
    {
        Entities = entities;
        TotalCount = totalCount;
    }
    
    /// <summary>
    /// Музыка
    /// </summary>
    public List<GetAllSongResponseItem> Entities { get; }

    /// <summary>
    /// Общее кол-во
    /// </summary>
    public int TotalCount { get; }
}