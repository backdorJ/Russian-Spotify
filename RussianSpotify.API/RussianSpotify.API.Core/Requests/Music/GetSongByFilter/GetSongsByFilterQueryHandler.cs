using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.Contracts.Requests.Music.GetAllMusic;
using RussianSpotify.Contracts.Requests.Music.GetSongsByFilter;

namespace RussianSpotify.API.Core.Requests.Music.GetSongByFilter;

/// <summary>
/// Обработчик для <see cref="GetSongsByFilterQuery"/>
/// </summary>
/// <param name="dbContext">Контекст БД</param>
/// <param name="filterHandler">Фильтр хэндлер</param>
public class GetSongsByFilterQueryHandler(IDbContext dbContext, IFilterHandler filterHandler)
    : IRequestHandler<GetSongsByFilterQuery, GetSongsByFilterResponse>
{
    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<GetSongsByFilterResponse> Handle(GetSongsByFilterQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var query = dbContext.Songs.AsQueryable();

        var filteredSongs =
            await filterHandler.GetByFilterAsync(query, request.FilterName, request.FilterValue, cancellationToken);
        
        var totalCount = await filteredSongs.CountAsync(cancellationToken);

        var resultSongs = await filteredSongs
            .Select(x => new GetAllSongResponseItem
            {
                ImageId = x.ImageId,
                SongId = x.Id,
                SongName = x.SongName,
                Duration = x.Duration,
                Category = x.Category.CategoryName.GetDescription(),
                Authors = x.Authors
                    .Select(y => y.UserName)
                    .ToList()
            })
            .SkipTake(request: request)
            .ToListAsync(cancellationToken);

        return new GetSongsByFilterResponse(resultSongs, totalCount);
    }
}