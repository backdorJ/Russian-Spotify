using MediatR;
using RussianSpotify.Contracts.Models;
using RussianSpotify.Contracts.Requests.Music.GetSongsByFilter;

namespace RussianSpotify.API.Core.Requests.Music.GetSongByFilter;

/// <summary>
/// Запрос на получение песен по фильтру
/// </summary>
/// <param name="request">GetSongsByFilterRequest реквест, который приходит с фронта</param>
public class GetSongsByFilterQuery
    : GetSongsByFilterRequest, IRequest<GetSongsByFilterResponse>, IPaginationFilter
{
    ///<summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">GetSongsByFilterRequest реквест, который приходит с фронта</param>
    public GetSongsByFilterQuery(GetSongsByFilterRequest request)
        : base(request)
    {
    }
}