using System.Security.AccessControl;

namespace RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

/// <summary>
/// Ответ на запрос <see cref="GetAuthorsByFilterRequest"/>
/// </summary>
public class GetAuthorsByFilterResponse
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="entities">Список сущностей в ответе</param>
    /// <param name="totalCount">Общее количество сущностей</param>
    public GetAuthorsByFilterResponse(List<GetAuthorsByFilterResponseItem> entities, int totalCount)
    {
        Entities = entities;
        TotalCount = totalCount;
    }

    /// <summary>
    /// Сущности
    /// </summary>
    public List<GetAuthorsByFilterResponseItem> Entities { get; set; }

    /// <summary>
    /// Общее количество
    /// </summary>
    public int TotalCount { get; set; }
}