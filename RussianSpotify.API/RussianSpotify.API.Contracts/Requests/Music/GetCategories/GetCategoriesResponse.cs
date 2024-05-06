namespace RussianSpotify.Contracts.Requests.Music.GetCategories;

public class GetCategoriesResponse
{
    public GetCategoriesResponse(List<GetCategoriesResponseItem> categories)
    {
        Entities = categories;
    }
    
    public List<GetCategoriesResponseItem> Entities { get; set; } = new();
}