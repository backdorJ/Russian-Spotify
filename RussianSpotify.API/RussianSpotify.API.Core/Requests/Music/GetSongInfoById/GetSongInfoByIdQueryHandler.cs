using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.Contracts.Requests.Music.GetSongInfoById;

namespace RussianSpotify.API.Core.Requests.Music.GetSongInfoById;

public class GetSongInfoByIdQueryHandler
    : IRequestHandler<GetSongInfoByIdQuery, GetSongInfoByIdResponse>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="userContext">Контекст пользователя</param>
    public GetSongInfoByIdQueryHandler(IDbContext dbContext, IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    /// <inheritdoc />
    public async Task<GetSongInfoByIdResponse> Handle(
        GetSongInfoByIdQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var isHaveCurrentSong = await _dbContext.Users
            .Where(x => x.Id == _userContext.CurrentUserId)
            .AnyAsync(x => x.Bucket!.Songs
                .Select(y => y.Id)
                .Contains(request.SongId),
                cancellationToken);
        
        var currentSong = await _dbContext.Songs
            .Include(x => x.Category)
            .Include(x => x.Authors)
            .FirstOrDefaultAsync(x => x.Id == request.SongId, cancellationToken)
            ?? throw new EntityNotFoundException<Song>(request.SongId);

        return new GetSongInfoByIdResponse
        {
            Id = currentSong.Id,
            SongName = currentSong.SongName,
            Duration = currentSong.Duration,
            Authors = currentSong.Authors
                .Select(x => x.UserName)
                .ToList(),
            Category = currentSong.Category.CategoryName.GetDescription(),
            ImageId = currentSong.ImageId,
            IsHave = isHaveCurrentSong,
        };
    }
}