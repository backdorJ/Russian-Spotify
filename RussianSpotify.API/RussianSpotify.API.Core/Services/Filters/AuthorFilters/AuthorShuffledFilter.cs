using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.AuthorFilters;

public class AuthorShuffledFilter : IFilter<User>
{
    public Task<IOrderedQueryable<User>> FilterAsync(IQueryable<User> queryable, string filterValue,
        CancellationToken cancellationToken)
    {
        return Task.FromResult(queryable.OrderBy(i => i.UserName));
    }
}