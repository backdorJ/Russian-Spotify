using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Services.Filters.SongFilters;

/// <summary>
/// Фильтрует песни по конкретному автору
/// </summary>
public class AuthorSongsFilter : IFilter<Song>
{
    /// <inheritdoc cref="IFilter{T}"/>
    public Task<IOrderedQueryable<Song>> FilterAsync(IQueryable<Song> queryable, string filterValue,
        CancellationToken cancellationToken)
        => Task.FromResult(queryable
            .Where(song => song.Authors
                .Select(author => author.UserName).Contains(filterValue))
            .OrderByDescending(x => x.PlaysNumber));
}