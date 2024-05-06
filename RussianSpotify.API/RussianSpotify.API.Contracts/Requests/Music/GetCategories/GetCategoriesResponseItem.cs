namespace RussianSpotify.Contracts.Requests.Music.GetCategories;

public class GetCategoriesResponseItem
{
    public int CategoryNumber { get; set; }
    public string CategoryName { get; set; } = null!;
}