using MediatR;
using RussianSpotify.Contracts.Requests.Playlist.GetPlaylistsByFilter;

namespace RussianSpotify.API.Core.Requests.Playlist.GetPlaylistsByFilter;

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