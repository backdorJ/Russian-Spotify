using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetCategories;

namespace RussianSpotify.API.Core.Requests.Music.GetCategories;

/// <summary>
/// Query for getting all Song Categories
/// </summary>
public class GetCategoriesQuery : IRequest<GetCategoriesResponse>
{
}