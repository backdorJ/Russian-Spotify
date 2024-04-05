using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Requests.Music.DeleteSongAuthor;

/// <summary>
/// Обработчик запроса на удаление автора песни
/// </summary>
public class DeleteSongAuthorCommandHandler : IRequestHandler<DeleteSongAuthorCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст базы данных</param>
    /// <param name="userContext">Контекст текущего пользователя</param>
    public DeleteSongAuthorCommandHandler(IDbContext dbContext, IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    /// <inheritdoc/> 
    public async Task Handle(DeleteSongAuthorCommand request, CancellationToken cancellationToken)
    {
        // Достаем песню из бд
        var song = await _dbContext.Songs
            .Include(i => i.Authors)
            .FirstOrDefaultAsync(i => i.Id == request.SongId, cancellationToken);

        if (song is null)
            throw new SongBadRequestException("Song not found");

        // Достаем текущего пользователя из бд
        var currentUserId = _userContext.CurrentUserId;
        if (currentUserId is null)
            throw new SongInternalException("Current User Id not found");

        // Проверка на то, пользовател не пытается удалить самого себя
        if (currentUserId == request.AuthorId)
            throw new SongForbiddenException("Author can't remove themself");

        // Проверка, является ли текущий пользователь автором данной песни
        if (song.Authors.All(i => i.Id != currentUserId))
            throw new SongForbiddenException("User is not Author of this Song");

        // Достаем автора, которого хотим удалить
        var songAuthorToDelete = song.Authors
            .FirstOrDefault(i => i.Id == request.AuthorId);

        if (songAuthorToDelete is null)
            throw new BadSongAuthorException("User is not Author of this Song");

        // Вносим изменения в бд
        song.RemoveAuthor(songAuthorToDelete);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}