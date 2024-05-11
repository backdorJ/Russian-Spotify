using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.PlaylistFilter;

/// <summary>
/// Фильтр для получения плейлистов пользователя, чтобы добавить туда песню
/// </summary>
public class UserPlaylistsFilter : IFilter<Playlist>
{
    /// <inheritdoc />
    public Task<IOrderedQueryable<Playlist>> FilterAsync(
        IQueryable<Playlist> queryable,
        string filterValue,
        CancellationToken cancellationToken)
        => Task.FromResult(queryable
            .Where(x => x.Author!.UserName == filterValue)
            .OrderBy(x => x.PlaysNumber));
}