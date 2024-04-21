using MediatR;
using RussianSpotify.Contracts.Requests.Playlist.GetPlaylistsByFilter;

namespace RussianSpotify.API.Core.Requests.Playlist.GetPlaylistsByFilter;

/// <summary>
/// Запрос на получение плейлистов по фильтру
/// </summary>
public class GetPlaylistsByFilterQuery
    : GetPlaylistsByFilterRequest, IRequest<GetPlaylistsByFilterResponse>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public GetPlaylistsByFilterQuery(GetPlaylistsByFilterRequest request)
        : base(request)
    {
    }
}