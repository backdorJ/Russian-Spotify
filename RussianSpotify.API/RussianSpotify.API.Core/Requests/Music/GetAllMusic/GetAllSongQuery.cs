using MediatR;
using RussianSpotify.Contracts.Models;
using RussianSpotify.Contracts.Requests.Music.GetAllMusic;

namespace RussianSpotify.API.Core.Requests.Music.GetAllMusic;

/// <summary>
/// Запро на получение всей музыки
/// </summary>
public class GetAllSongQuery
    : GetAllSongRequest, IRequest<GetAllSongResponse>, IPaginationFilter
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public GetAllSongQuery(GetAllSongRequest request)
        : base(request)
    {
    }
}