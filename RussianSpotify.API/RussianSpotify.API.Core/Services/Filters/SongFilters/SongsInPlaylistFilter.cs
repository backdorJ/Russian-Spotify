using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.SongFilters;

/// <summary>
/// Фильрует песни по плейлисту
/// </summary>
public class SongsInPlaylistFilter : IFilter<Song>
{
    /// <inheritdoc cref="IFilter{T}"/>
    public Task<IOrderedQueryable<Song>> FilterAsync(IQueryable<Song> queryable, string filterValue,
        CancellationToken cancellationToken)
    {
        var playlistId = Guid.Parse(filterValue);

        return Task.FromResult(queryable
            .Where(x => x.Playlists
                .Any(playlist => playlist.Id == playlistId))
            .OrderBy(x => x.Id));
    }
}