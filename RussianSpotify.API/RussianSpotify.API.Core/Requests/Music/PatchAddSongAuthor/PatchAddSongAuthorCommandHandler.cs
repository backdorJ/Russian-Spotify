using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Requests.Music.PatchAddSongAuthor;

/// <summary>
/// Обработчик запроса на добавление автора песни
/// </summary>
public class PatchAddSongAuthorCommandHandler : IRequestHandler<PatchAddSongAuthorCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;
    private readonly UserManager<User> _userManager;
    private readonly ISongHelper _songHelper;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст базы данных</param>
    /// <param name="userManager">Сервис для работы с пользователями</param>
    public PatchAddSongAuthorCommandHandler(IDbContext dbContext, UserManager<User> userManager, IUserContext userContext, ISongHelper songHelper)
    {
        _dbContext = dbContext;
        _userManager = userManager;
        _userContext = userContext;
        _songHelper = songHelper;
    }

    /// <inheritdoc/>
    public async Task Handle(PatchAddSongAuthorCommand request, CancellationToken cancellationToken)
    {
        var songFromDb = await _dbContext.Songs
            .Include(i => i.Authors)
            .FirstOrDefaultAsync(i => i.Id == request.SongId, cancellationToken);

        if (songFromDb is null)
            throw new SongBadRequestException("Song not found");

        var currentUserId = _userContext.CurrentUserId;
        if (currentUserId is null)
            throw new SongInternalException("Current User Id not found");
        
        if (!await _songHelper.IsAuthorAsync(songFromDb, currentUserId.Value, cancellationToken))
            throw new SongForbiddenException("User is not Author of this Song");
            
        var userFromDb = await _dbContext.Users
            .FirstOrDefaultAsync(i => i.Id == request.AuthorId, cancellationToken);

        if (userFromDb is null)
            throw new BadSongAuthorException("User not found");

        const string roleToSearch = "автор";
        var userRoles = await _userManager.GetRolesAsync(userFromDb);
        var ifContainsAuthorRole = userRoles.Select(i => i.ToLower()).Contains(roleToSearch.ToLower());

        if (!ifContainsAuthorRole)
            throw new SongBadRequestException("User is not Author");

        songFromDb.AddAuthor(userFromDb);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}