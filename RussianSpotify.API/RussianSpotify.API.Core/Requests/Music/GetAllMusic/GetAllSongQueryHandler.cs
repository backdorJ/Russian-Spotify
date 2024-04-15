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
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="userContext">Контекст пользователя</param>
    public GetAllSongQueryHandler(IDbContext dbContext, IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    /// <inheritdoc />
    public async Task<GetAllSongResponse> Handle(
        GetAllSongQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var songsFromDb = request.IsFavourite
            ? GetFavouriteSongs()
            : GetAllSongs();

        var totalCount = await songsFromDb.CountAsync(cancellationToken);
        var songs = await songsFromDb
            .SkipTake(request: request)
            .ToListAsync(cancellationToken);

        return new GetAllSongResponse(entities: songs, totalCount: totalCount);
    }

    private IQueryable<GetAllSongResponseItem> GetFavouriteSongs()
        => _dbContext.Users
            .Where(x => x.Id == _userContext.CurrentUserId)
            .SelectMany(x => x.Bucket!.Songs)
            .Select(x => new GetAllSongResponseItem
            {
                SongId = x.Id,
                SongName = x.SongName,
                ImageId = x.ImageId,
                Duration = x.Duration,
                Category = x.Category.CategoryName.GetDescription(),
                Authors = x.Authors
                    .Select(y => y.UserName)
                    .ToList()
            })
            .AsQueryable();

    private IQueryable<GetAllSongResponseItem> GetAllSongs()
        => _dbContext.Songs
            .Select(x => new GetAllSongResponseItem
            {
                SongId = x.Id,
                SongName = x.SongName,
                ImageId = x.ImageId,
                Duration = x.Duration,
                Category = x.Category.CategoryName.GetDescription(),
                Authors = x.Authors
                    .Select(y => y.UserName)
                    .ToList(),
            })
            .AsQueryable();
}