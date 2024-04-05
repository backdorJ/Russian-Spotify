using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Requests.Music.PatchAddSongImage;

/// <summary>
/// Обработчик запроса на добавление картинки песни
/// </summary>
public class PatchAddSongImageCommandHandler : IRequestHandler<PatchAddSongImage.PatchAddSongImageCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IFileHelper _fileHelper;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст базы данных</param>
    /// <param name="fileHelper">Сервис для работы с файлами</param>
    public PatchAddSongImageCommandHandler(IDbContext dbContext, IFileHelper fileHelper)
    {
        _dbContext = dbContext;
        _fileHelper = fileHelper;
    }

    /// <inheritdoc/>
    public async Task Handle(PatchAddSongImage.PatchAddSongImageCommand request, CancellationToken cancellationToken)
    {
        var songFromDb = await _dbContext.Songs
            .FirstOrDefaultAsync(i => i.Id == request.SongId, cancellationToken);

        if (songFromDb is null)
            throw new SongBadRequestException("Song not found");
        
        var imageFromDb = await _dbContext.Files
            .FirstOrDefaultAsync(i => i.Id == request.ImageId, cancellationToken);

        if (imageFromDb is null)
            throw new SongBadImageException("File not found");

        if (!_fileHelper.IsImage(imageFromDb))
            throw new SongBadImageException("File's content type is not Image");
        
        songFromDb.Image = imageFromDb;
        imageFromDb.SetSong(songFromDb);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}