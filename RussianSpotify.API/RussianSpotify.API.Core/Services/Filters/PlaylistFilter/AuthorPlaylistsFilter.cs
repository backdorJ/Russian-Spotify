using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.PlaylistFilter;

/// <summary>
/// Фильтрует плейлисты по конкретному автору
/// </summary>
public class AuthorPlaylistsFilter : IFilter<Playlist>
{
    /// <inheritdoc cref="IFilter{T}"/>
    public Task<IOrderedQueryable<Playlist>> FilterAsync(IQueryable<Playlist> queryable, string filterValue,
        CancellationToken cancellationToken)
        => Task.FromResult(queryable
                .Where(x => x.IsAlbum && x.Author!.UserName == filterValue)
                .OrderByDescending(x => x.PlaysNumber));
}