using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.Contracts.Requests.Music.GetAllMusic;

namespace RussianSpotify.API.Core.Requests.Music.GetAllMusic;

/// <summary>
/// Обработчик для <see cref="GetAllSongQuery"/>
/// </summary>
public class GetAllSongQueryHandler : IRequestHandler<GetAllSongQuery, GetAllSongResponse>
{
    private readonly IDbContext _dbContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    public GetAllSongQueryHandler(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<GetAllSongResponse> Handle(
        GetAllSongQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var query = _dbContext.Songs.AsQueryable();

        var totalCount = await query.CountAsync(cancellationToken);
        var songs = await query
            .Select(x => new GetAllSongResponseItem
            {
                ImageId = x.ImageId,
                SongId = x.Id,
                SongName = x.SongName,
                Duration = x.Duration,
                Category = x.Category.CategoryName.GetDescription(),
                Authors = x.Authors
                    .Select(y => y.UserName)
                    .ToList(),
            })
            .SkipTake(request: request)
            .ToListAsync(cancellationToken);

        return new GetAllSongResponse(entities: songs, totalCount: totalCount);
    }
}