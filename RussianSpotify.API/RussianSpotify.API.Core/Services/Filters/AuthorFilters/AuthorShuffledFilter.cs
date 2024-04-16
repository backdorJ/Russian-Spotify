using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.AuthorFilters;

/// <inheritdoc/>
[Obsolete("Нельзя так сортировать на стороне СУБД, ибо из-за инклуда ломается (дубликаты)")]
public class AuthorShuffledFilter : IFilter<User>
{
    public Task<IOrderedQueryable<User>> FilterAsync(IQueryable<User> queryable, string filterValue,
        CancellationToken cancellationToken)
    {
        return Task.FromResult(queryable.OrderBy(i => Guid.NewGuid()));
    }
}