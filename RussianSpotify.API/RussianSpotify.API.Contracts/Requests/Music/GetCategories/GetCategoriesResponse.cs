namespace RussianSpotify.Contracts.Requests.Music.GetCategories;

/// <summary>
/// Ответ на получение всех Категорий Песен (Жанров)
/// </summary>
public class GetCategoriesResponse
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="categories">Список из <see cref="GetCategoriesResponseItem"/></param>
    public GetCategoriesResponse(List<GetCategoriesResponseItem> categories)
    {
        Entities = categories;
    }

    /// <summary>
    /// Категории
    /// </summary>
    public List<GetCategoriesResponseItem> Entities { get; set; } = new();
}