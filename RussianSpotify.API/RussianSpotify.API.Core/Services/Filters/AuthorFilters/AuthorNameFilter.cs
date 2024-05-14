using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.AuthorFilters;

/// <inheritdoc/>
public class AuthorNameFilter : IFilter<User>
{
    public Task<IOrderedQueryable<User>> FilterAsync(IQueryable<User> queryable, string filterValue,
        CancellationToken cancellationToken)
        => Task.FromResult(queryable
            .Where(author => author.UserName!.ToLower().Contains(filterValue.ToLower()))
            .OrderBy(i => i.UserName));
}