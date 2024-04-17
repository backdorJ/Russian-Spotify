using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.PlaylistFilter;


public class FavoritePlaylistsFilter : IFilter<Playlist>
{
    public Task<IOrderedQueryable<Playlist>> FilterAsync(IQueryable<Playlist> queryable, string filterValue, CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(filterValue);

        return Task.FromResult(queryable
            .Include(x => x.Users)
            .Where(playlist => playlist.Users.Any(user => user.Id.Equals(userId)))
            .OrderBy(playlist => playlist.Id));
    }
}