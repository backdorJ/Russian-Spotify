using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.PlaylistFilter;

/// <inheritdoc/>
public class PlaylistNameFilter : IFilter<Playlist>
{
    public Task<IOrderedQueryable<Playlist>> FilterAsync(IQueryable<Playlist> queryable, string filterValue,
        CancellationToken cancellationToken)
        => Task.FromResult(queryable
            .Where(playlist => playlist.PlaylistName.ToLower().Contains(filterValue.ToLower()))
            .OrderBy(i => i.PlaylistName));
}