namespace RussianSpotify.Contracts.Requests.Music.GetCategories;

/// <summary>
/// Response for getting all Song Categories
/// </summary>
public class GetCategoriesResponse
{
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="categories">List of <see cref="GetCategoriesResponseItem"/></param>
    public GetCategoriesResponse(List<GetCategoriesResponseItem> categories)
    {
        Entities = categories;
    }

    /// <summary>
    /// Categories
    /// </summary>
    public List<GetCategoriesResponseItem> Entities { get; set; } = new();
}