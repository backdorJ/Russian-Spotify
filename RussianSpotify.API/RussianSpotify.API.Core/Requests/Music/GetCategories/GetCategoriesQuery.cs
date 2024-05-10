using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetCategories;

namespace RussianSpotify.API.Core.Requests.Music.GetCategories;

/// <summary>
/// Запрос на получение всех Категорий песен
/// </summary>
public class GetCategoriesQuery : IRequest<GetCategoriesResponse>
{
}