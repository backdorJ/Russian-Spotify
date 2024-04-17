using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.SongFilters;

public class FavoriteSongsFilter : IFilter<Song>
{
    public Task<IOrderedQueryable<Song>> FilterAsync(IQueryable<Song> queryable, string filterValue,
        CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(filterValue);
        
        return Task.FromResult(queryable
            .Where(x => x.Buckets
                .Any(b => b.UserId.Equals(userId)))
            .OrderBy(x => x.Id));
    }
}