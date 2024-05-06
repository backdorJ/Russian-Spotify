using MediatR;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.Contracts.Enums;
using RussianSpotify.Contracts.Requests.Music.GetCategories;

namespace RussianSpotify.API.Core.Requests.Music.GetCategories;

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, GetCategoriesResponse>
{
    public GetCategoriesQueryHandler()
    {
    }

    public Task<GetCategoriesResponse> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var resultList = new List<GetCategoriesResponseItem>();

        foreach (CategoryTypes category in Enum.GetValues(typeof(CategoryTypes)))
        {
            var categoryDescription = category.GetDescription();
            resultList.Add(new GetCategoriesResponseItem
            {
                CategoryNumber = (int)category,
                CategoryName = categoryDescription
            });
        }

        return Task.FromResult(new GetCategoriesResponse(resultList));
    }
}