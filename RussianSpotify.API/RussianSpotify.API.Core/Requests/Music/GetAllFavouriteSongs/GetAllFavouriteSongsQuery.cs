using MediatR;
using RussianSpotify.Contracts.Models;
using RussianSpotify.Contracts.Requests.Music.GetAllFavouriteSongs;

namespace RussianSpotify.API.Core.Requests.Music.GetAllFavouriteSongs;

/// <summary>
/// Запрос на получение любимой музыки
/// </summary>
public class GetAllFavouriteSongsQuery
    : GetAllFavouriteSongsRequest, IRequest<GetAllFavouriteSongsResponse>, IPaginationFilter
{
    /// <summary>
    /// Конструтктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public GetAllFavouriteSongsQuery(GetAllFavouriteSongsRequest request)
        : base(request)
    {
    }
}