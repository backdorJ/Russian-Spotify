using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.PlaylistFilter;

public class PlaylistNameFilter : IFilter<Playlist>
{
    /// <inheritdoc/>
    public Task<IOrderedQueryable<Playlist>> FilterAsync(IQueryable<Playlist> queryable, string filterValue,
        CancellationToken cancellationToken)
        => Task.FromResult(queryable
            .Where(playlist => playlist.PlaylistName.ToLower().Contains(filterValue.ToLower()))
            .OrderBy(i => i.PlaylistName));
}