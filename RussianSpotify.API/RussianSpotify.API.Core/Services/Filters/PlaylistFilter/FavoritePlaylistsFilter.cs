using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.PlaylistFilter;

/// <summary>
/// Фильтрует плейлисты по понравившимся
/// </summary>
public class FavoritePlaylistsFilter : IFilter<Playlist>
{
    /// <inheritdoc cref="IFilter{T}"/>
    public Task<IOrderedQueryable<Playlist>> FilterAsync(IQueryable<Playlist> queryable, string filterValue,
        CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(filterValue);

        return Task.FromResult(queryable
            .Include(i => i.PlaylistUsers.Where(e => e.UserId == userId))
            .ThenInclude(i => i.User)
            .Where(playlist => playlist.Users.Any(user => user.Id.Equals(userId)))
            .OrderBy(i => i.PlaylistUsers.FirstOrDefault()!.AddedDate));
    }
}