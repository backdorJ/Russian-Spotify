namespace RussianSpotify.Contracts.Requests.Music.GetCategories;

/// <summary>
/// Категория для <see cref="GetCategoriesResponse"/>
/// </summary>
public class GetCategoriesResponseItem
{
    /// <summary>
    /// Номер категории в Enum/>
    /// </summary>
    public int CategoryNumber { get; set; }

    /// <summary>
    /// Название категории
    /// </summary>
    public string CategoryName { get; set; } = null!;
}