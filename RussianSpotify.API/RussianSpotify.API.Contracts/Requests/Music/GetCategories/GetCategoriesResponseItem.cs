namespace RussianSpotify.Contracts.Requests.Music.GetCategories;

/// <summary>
/// Single category for <see cref="GetCategoriesResponse"/>
/// </summary>
public class GetCategoriesResponseItem
{
    /// <summary>
    /// Category number in Enum
    /// </summary>
    public int CategoryNumber { get; set; }

    /// <summary>
    /// Category name
    /// </summary>
    public string CategoryName { get; set; } = null!;
}