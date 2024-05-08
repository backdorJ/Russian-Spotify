using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.PlaylistFilter;

/// <summary>
/// Фильтр для перемешивания альбомов
/// </summary>
public class AlbumShuffledFilter : IFilter<Playlist>
{
    /// <inheritdoc/>
    public Task<IOrderedQueryable<Playlist>> FilterAsync(IQueryable<Playlist> queryable, string filterValue,
        CancellationToken cancellationToken)
        =>
            Task.FromResult(queryable
                .Where(i => i.IsAlbum)
                .OrderBy(playlist => Guid.NewGuid()));
}