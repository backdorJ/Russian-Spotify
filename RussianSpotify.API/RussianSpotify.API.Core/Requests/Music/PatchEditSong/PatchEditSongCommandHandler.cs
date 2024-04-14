using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Requests.Music.PatchEditSong;

/// <summary>
/// Обработчик команды на обновление данных о песне
/// </summary>
public class PatchEditSongCommandHandler : IRequestHandler<PatchEditSongCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;
    private readonly IFileHelper _fileHelper;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст базы данных</param>
    /// <param name="fileHelper">Сервис для работы с файлами</param>
    /// <param name="userContext">Контекст текущего пользователя</param>
    public PatchEditSongCommandHandler(IDbContext dbContext, IFileHelper fileHelper, IUserContext userContext)
    {
        _dbContext = dbContext;
        _fileHelper = fileHelper;
        _userContext = userContext;
    }

    /// <inheritdoc/> 
    public async Task Handle(PatchEditSongCommand request, CancellationToken cancellationToken)
    {
        // Достаем песню из бд
        var songFromDb = await _dbContext.Songs
            .Include(i => i.Authors)
            .FirstOrDefaultAsync(i => i.Id == request.SongId, cancellationToken);

        if (songFromDb is null)
            throw new SongBadRequestException("Song not found");

        // Проверка, является ли текущий пользователь автором данной песни
        var currentUserId = _userContext.CurrentUserId;
        if (currentUserId is null)
            throw new SongInternalException("Current User Id not found");

        if (songFromDb.Authors.All(i => i.Id != currentUserId))
            throw new SongForbiddenException("User is not Author of this Song");

        // Проверка, было ли введено новое название песни и обновляем если да
        if (!string.IsNullOrEmpty(request.SongName) &&
            !string.IsNullOrWhiteSpace(request.SongName))
            songFromDb.SongName = request.SongName;

        // Проверяем, была ли введена продолжительность песни
        if (request.Duration is not null)
        {
            // Валидация и добавление
            if (request.Duration < 0)
                throw new SongBadRequestException("Wrong song duration was provided");
            songFromDb.Duration = request.Duration.Value;
        }

        // Проверяем, была ли введена новая категория
        if (request.Category is not null)
        {
            // Получаем категорию из бд
            var categoryFromDb = await _dbContext.Categories
                .FirstOrDefaultAsync(i => (int)i.CategoryName == request.Category, cancellationToken);

            if (categoryFromDb is null)
                throw new SongBadCategoryException("Category not found");
            songFromDb.Category = categoryFromDb;
        }

        // Проверяем, был ли введен Id картинги
        if (request.ImageId is not null)
        {
            // Достаем картину из бд
            var imageFromDb = await _dbContext.Files
                .FirstOrDefaultAsync(i => i.Id == request.ImageId.Value, cancellationToken);

            if (imageFromDb is null)
                throw new SongBadImageException("File not found");

            // Проверка, является ли файл картинкой и присвоение
            if (!_fileHelper.IsImage(imageFromDb))
                throw new SongBadImageException("File's content type is not Image");
            songFromDb.Image = imageFromDb;
        }

        // Проверяем, был лы введен Id файла песни
        if (request.SongFileId is not null)
        {
            // Достаем файл из бд
            var fileFromDb = await _dbContext.Files
                .FirstOrDefaultAsync(i => i.Id == request.SongFileId.Value, cancellationToken);

            if (fileFromDb is null)
                throw new SongBadRequestException("Song File not found");

            // Проверяем, является ли файл аудио и присвоение
            if (!_fileHelper.IsAudio(fileFromDb))
                throw new SongBadFileException("File's content type is not Audio");
            fileFromDb.Song = songFromDb;
        }

        // Вносим изменения в бд
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}