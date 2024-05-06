using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetCategories;

namespace RussianSpotify.API.Core.Requests.Music.GetCategories;

public class GetCategoriesQuery : IRequest<GetCategoriesResponse>
{
}