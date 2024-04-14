using System.Security.AccessControl;

namespace RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

public class GetAuthorsByFilterResponse
{
    public GetAuthorsByFilterResponse(List<GetAuthorsByFilterResponseItem> entities, int totalCount)
    {
        Entities = entities;
        TotalCount = totalCount;
    }

    public List<GetAuthorsByFilterResponseItem> Entities { get; set; }
    public int TotalCount { get; set; }
}