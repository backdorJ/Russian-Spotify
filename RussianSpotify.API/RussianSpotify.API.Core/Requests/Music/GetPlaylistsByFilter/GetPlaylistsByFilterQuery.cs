using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetPlaylistsByFilter;

namespace RussianSpotify.API.Core.Requests.Music.GetPlaylistsByFilter;

public class GetPlaylistsByFilterQuery
    : GetPlaylistsByFilterRequest, IRequest<List<GetPlaylistsByFilterResponse>>
{
    public GetPlaylistsByFilterQuery(GetPlaylistsByFilterRequest request)
        : base(request)
    {
    }
}