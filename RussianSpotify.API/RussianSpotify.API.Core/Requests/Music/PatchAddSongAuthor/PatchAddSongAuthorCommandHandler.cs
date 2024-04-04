using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Requests.Music.PatchAddSongAuthor;

/// <summary>
/// Обработчик запроса на добавление автора песни
/// </summary>
public class PatchAddSongAuthorCommandHandler : IRequestHandler<PatchAddSongAuthorCommand>
{
    private readonly IDbContext _dbContext;
    private readonly UserManager<User> _userManager;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст базы данных</param>
    /// <param name="userManager">Сервис для работы с пользователями</param>
    public PatchAddSongAuthorCommandHandler(IDbContext dbContext, UserManager<User> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    /// <inheritdoc/>
    public async Task Handle(PatchAddSongAuthorCommand request, CancellationToken cancellationToken)
    {
        var songFromDb = await _dbContext.Songs
            .FirstOrDefaultAsync(i => i.Id == request.SongId, cancellationToken);

        if (songFromDb is null)
            throw new SongBadRequestException("Song not found");

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