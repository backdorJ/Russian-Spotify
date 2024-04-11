using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetPlaylistsByFilter;

namespace RussianSpotify.API.Core.Requests.Music.GetPlaylistsByFilter;

public class GetPlaylistsByFilterQuery(GetPlaylistsByFilterRequest request) 
    : GetPlaylistsByFilterRequest(request), IRequest<List<GetPlaylistsByFilterResponse>>;