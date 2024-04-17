namespace RussianSpotify.Contracts.Requests.Music.GetSongsByFilter;

public class GetSongsByFilterResponse
{
    public GetSongsByFilterResponse(List<GetSongsByFilterResponseItem> entities, int totalCount)
    {
        Entities = entities;
        TotalCount = totalCount;
    }
    
    public List<GetSongsByFilterResponseItem> Entities { get; set; }
    
    public int TotalCount { get; set; }
}