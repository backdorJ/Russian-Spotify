using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetPlaylistsByFilter;

namespace RussianSpotify.API.Core.Requests.Music.GetPlaylistsByFilter;

/// <summary>
/// Запрос на получение плейлистов по фильтру
/// </summary>
public class GetPlaylistsByFilterQuery
    : GetPlaylistsByFilterRequest, IRequest<List<GetPlaylistsByFilterResponse>>
{
    public GetPlaylistsByFilterQuery(GetPlaylistsByFilterRequest request)
        : base(request)
    {
    }
}