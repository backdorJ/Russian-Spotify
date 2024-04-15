using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;

namespace RussianSpotify.API.Core.Requests.Playlist.PostCreatePlaylist;

/// <summary>
/// Обработчия для <see cref="PostCreatePlaylistCommand"/>
/// </summary>
public class PostCreatePlaylistCommandHandler : IRequestHandler<PostCreatePlaylistCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IUserContext _userContext;
    private readonly UserManager<User> _userManager;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="userContext">Контекст пользователя</param>
    /// <param name="userManager">Хуйня для проверки роли</param>
    /// <param name="dateTimeProvider">Провайдер даты</param>
    public PostCreatePlaylistCommandHandler(
        IDbContext dbContext,
        IUserContext userContext,
        UserManager<User> userManager,
        IDateTimeProvider dateTimeProvider)
    {
        _dbContext = dbContext;
        _userContext = userContext;
        _userManager = userManager;
        _dateTimeProvider = dateTimeProvider;
    }

    /// <inheritdoc />
    public async Task Handle(PostCreatePlaylistCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var currentUser = await _dbContext.Users
            .Include(x => x.AuthorPlaylists)
            .FirstOrDefaultAsync(x => x.Id == _userContext.CurrentUserId, cancellationToken)
            ?? throw new EntityNotFoundException<User>(_userContext.CurrentUserId!.Value);

        var userRoles = await _userManager.GetRolesAsync(currentUser);

        var isArtist = userRoles.Contains(BaseRoles.AdminRoleName) || userRoles.Contains(BaseRoles.AuthorRoleName);
        
        if (!isArtist && request.IsAlbum)
            throw new ApplicationBaseException("Пользователь не может создать альбом, только плейлист");
        
        var imageFromDb = await _dbContext.Files
            .FirstOrDefaultAsync(x => x.Id == request.ImageId, cancellationToken)
            ?? throw new EntityNotFoundException<Entities.File>(request.ImageId);

        var songs = await _dbContext.Songs
            .Where(x => request.SongIds.Contains(x.Id))
            .ToListAsync(cancellationToken);
        
        if (!songs.Any())
            throw new ApplicationBaseException("Вы не можете создать пустой плейлист/альбом");
        
        var playlist = new Entities.Playlist
        {
            PlaylistName = request.PlaylistName,
            Image = imageFromDb,
            IsAlbum = request.IsAlbum,
            Songs = songs,
            Author = currentUser,
            ReleaseDate = _dateTimeProvider.CurrentDate,
            Users = new List<User>
            {
                currentUser
            },
        };

        await _dbContext.Playlists.AddAsync(playlist, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}