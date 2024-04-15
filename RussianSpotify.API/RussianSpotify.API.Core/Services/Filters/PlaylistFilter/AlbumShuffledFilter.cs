using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.PlaylistFilter;

public class AlbumShuffledFilter : IFilter<Playlist>
{
    public Task<IOrderedQueryable<Playlist>> FilterAsync(IQueryable<Playlist> queryable, string filterValue,
        CancellationToken cancellationToken) 
        =>
        Task.FromResult(queryable
            .Where(i => i.IsAlbum)
            .OrderBy(playlist => Guid.NewGuid()));
}