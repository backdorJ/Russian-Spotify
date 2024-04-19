using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;

namespace RussianSpotify.API.Core.Requests.Playlist.PostAddPlaylistToFavourite;

/// <summary>
/// Обработчик для <see cref="PostAddPlaylistToFavouriteCommand"/>
/// </summary>
public class PostAddPlaylistToFavouriteCommandHandler : IRequestHandler<PostAddPlaylistToFavouriteCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="userContext">Контекст пользователя</param>
    public PostAddPlaylistToFavouriteCommandHandler(IDbContext dbContext, IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    /// <inheritdoc />
    public async Task Handle(PostAddPlaylistToFavouriteCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        var currentUser = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == _userContext.CurrentUserId, cancellationToken)
            ?? throw new EntityNotFoundException<User>(_userContext.CurrentUserId!.Value);

        var playlistFromDb = await _dbContext.Playlists
            .Include(x => x.Users)
            .FirstOrDefaultAsync(x => x.Id == request.PlaylistId, cancellationToken)
            ?? throw new EntityNotFoundException<Entities.Playlist>(request.PlaylistId);
        
        playlistFromDb.Users!.Add(currentUser);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}