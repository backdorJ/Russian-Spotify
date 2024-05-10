using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;

namespace RussianSpotify.API.Core.Requests.Music.PostAddSongToFavourite;

/// <summary>
/// Обработчик для <see cref="PostAddSongToFavouriteCommand"/>
/// </summary>
public class PostAddSongToFavouriteCommandHandler : IRequestHandler<PostAddSongToFavouriteCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="userContext">Контекст пользователя</param>
    public PostAddSongToFavouriteCommandHandler(
        IDbContext dbContext,
        IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    /// <inheritdoc />
    public async Task Handle(PostAddSongToFavouriteCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var currentUser = await _dbContext.Users
                              .Include(x => x.Bucket)
                              .ThenInclude(y => y!.Songs)
                              .FirstOrDefaultAsync(x => x.Id == _userContext.CurrentUserId, cancellationToken)
                          ?? throw new EntityNotFoundException<User>(_userContext.CurrentUserId!.Value);

        var songToAdd = await _dbContext.Songs
                            .FirstOrDefaultAsync(x => x.Id == request.SongId, cancellationToken)
                        ?? throw new EntityNotFoundException<Song>(request.SongId);

        (currentUser.Bucket ??= new Bucket()).Songs.Add(songToAdd);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}