using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;

namespace RussianSpotify.API.Core.Requests.Playlist.RemovePlaylistFromFavorite;

/// <summary>
/// Обработчик для <see cref="RemovePlaylistFromFavoriteCommand"/>
/// </summary>
public class RemovePlaylistFromFavoriteCommandHandler : IRequestHandler<RemovePlaylistFromFavoriteCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="userContext">Контекст пользователя</param>
    public RemovePlaylistFromFavoriteCommandHandler(
        IDbContext dbContext,
        IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    /// <inheritdoc />
    public async Task Handle(RemovePlaylistFromFavoriteCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var currentUser = await _dbContext.Users
                              .Include(x => x.Playlists)
                              .FirstOrDefaultAsync(x => x.Id == _userContext.CurrentUserId, cancellationToken)
                          ?? throw new EntityNotFoundException<User>(_userContext.CurrentUserId!.Value);

        var playlistFromDb = await _dbContext.Playlists
                                 .FirstOrDefaultAsync(x => x.Id == request.PlaylistId, cancellationToken)
                             ?? throw new EntityNotFoundException<Entities.Playlist>(request.PlaylistId);

        if (currentUser.Playlists is null)
            throw new ApplicationBaseException("У пользователя нет плейлистов");

        currentUser.Playlists.Remove(playlistFromDb);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}