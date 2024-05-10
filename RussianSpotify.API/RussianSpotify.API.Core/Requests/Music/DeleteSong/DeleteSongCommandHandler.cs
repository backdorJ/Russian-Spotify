using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.SongExceptions;
using RussianSpotify.Contracts.Requests.Music.DeleteSong;

namespace RussianSpotify.API.Core.Requests.Music.DeleteSong;

/// <summary>
/// Обработчик запроса на удаление песни
/// </summary>
public class DeleteSongCommandHandler : IRequestHandler<DeleteSongCommand, DeleteSongResponse>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;
    private readonly IFileHelper _fileHelper;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст базы данных</param>
    /// <param name="userContext">Контекст текущего пользователя</param>
    public DeleteSongCommandHandler(IDbContext dbContext, IUserContext userContext, IFileHelper fileHelper)
    {
        _dbContext = dbContext;
        _userContext = userContext;
        _fileHelper = fileHelper;
    }

    /// <inheritdoc/> 
    public async Task<DeleteSongResponse> Handle(DeleteSongCommand request, CancellationToken cancellationToken)
    {
        // Достаем песню из бд
        var song = await _dbContext.Songs
            .Include(i => i.Authors)
            .FirstOrDefaultAsync(i => i.Id == request.SongId, cancellationToken);

        if (song is null)
            throw new SongBadRequestException("Song not found");

        // Проверка, является ли текущий пользователь автором данной песни
        var currentUserId = _userContext.CurrentUserId;
        if (currentUserId is null)
            throw new SongInternalException("Current User Id not found");

        if (song.Authors.All(i => i.Id != currentUserId))
            throw new SongForbiddenException("User is not Author of this Song");

        var result = new DeleteSongResponse
        {
            SongId = song.Id,
            SongName = song.SongName
        };

        foreach (var file in song.Files)
        {
            await _fileHelper.DeleteFileAsync(file, cancellationToken);
        }
        
        // Вносим изменения в бд
        _dbContext.Songs.Remove(song);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return result;
    }
}