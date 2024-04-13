using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.Contracts.Requests.Music.GetAllFavouriteSongs;

namespace RussianSpotify.API.Core.Requests.Music.GetAllFavouriteSongs;

/// <summary>
/// Обработчик для <see cref="GetAllFavouriteSongsQuery"/>
/// </summary>
public class GetAllFavouriteSongsQueryHandler
    : IRequestHandler<GetAllFavouriteSongsQuery, GetAllFavouriteSongsResponse>
{
    private readonly IUserContext _userContext;
    private readonly IDbContext _dbContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="userContext">Контекст пользователя</param>
    /// <param name="dbContext">Контекст БД</param>
    public GetAllFavouriteSongsQueryHandler(
        IUserContext userContext,
        IDbContext dbContext)
    {
        _userContext = userContext;
        _dbContext = dbContext;
    }
    
    /// <inheritdoc />
    public async Task<GetAllFavouriteSongsResponse> Handle(
        GetAllFavouriteSongsQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var songsCurrentUser = _dbContext.Users
            .Where(x => x.Id == _userContext.CurrentUserId)
            .AsQueryable();

        var totalCount = await songsCurrentUser
            .SelectMany(x => x.Bucket!.Songs)
            .CountAsync(cancellationToken);
        
        var result =  await songsCurrentUser
            .SelectMany(x => x.Bucket!.Songs)
            .Select(x => new GetAllFavouriteSongsResponseItem
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
            .SkipTake(request)
            .ToListAsync(cancellationToken);

        return new GetAllFavouriteSongsResponse(result, totalCount);
    }
}