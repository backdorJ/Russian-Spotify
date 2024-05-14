using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;

namespace RussianSpotify.API.Core.Requests.Music.DeleteSongFromBucket;

/// <summary>
/// Обработчик для <see cref="DeleteSongFromBucketCommand"/>
/// </summary>
public class DeleteSongFromBucketCommandHandler : IRequestHandler<DeleteSongFromBucketCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="userContext">Контекст текущего пользователя</param>
    public DeleteSongFromBucketCommandHandler(IDbContext dbContext, IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    /// <inheritdoc />
    public async Task Handle(DeleteSongFromBucketCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var userFromDb = await _dbContext.Users
                             .Include(x => x.Bucket)
                             .ThenInclude(y => y!.Songs)
                             .FirstOrDefaultAsync(x => x.Id == _userContext.CurrentUserId, cancellationToken)
                         ?? throw new EntityNotFoundException<User>(_userContext.CurrentUserId!.Value);

        if (userFromDb.Bucket is null)
            throw new NotIncludedException(nameof(userFromDb.Bucket));

        var songCurrentUser = userFromDb.Bucket.Songs
                                  .FirstOrDefault(x => x.Id == request.SongId)
                              ?? throw new EntityNotFoundException<Song>(request.SongId);

        userFromDb.Bucket.Songs.Remove(songCurrentUser);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}