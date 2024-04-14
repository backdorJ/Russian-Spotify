using RussianSpotify.Contracts.Requests.Music.GetAllMusic;

namespace RussianSpotify.Contracts.Requests.Music.GetSongsByFilter;

public class GetSongsByFilterResponse : GetAllSongResponse
{
    public GetSongsByFilterResponse(List<GetAllSongResponseItem> entities, int totalCount)
        : base(entities, totalCount)
    {
    }
}