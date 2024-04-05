using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Requests.Music.PostAddSong;

/// <summary>
/// Обработчик команды на добавление новой песни
/// </summary>
public class PostAddSongCommandHandler : IRequestHandler<PostAddSongCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;
    private readonly IFileHelper _fileHelper;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Конекст базы данных</param>
    /// <param name="userContext">Контекст текущего пользователя</param>
    /// <param name="fileHelper">Сервис для работы с файлами</param>
    public PostAddSongCommandHandler(IDbContext dbContext, IUserContext userContext, IFileHelper fileHelper)
    {
        _dbContext = dbContext;
        _userContext = userContext;
        _fileHelper = fileHelper;
    }

    /// <inheritdoc/>
    public async Task Handle(PostAddSongCommand request, CancellationToken cancellationToken)
    {
        var category =
            await _dbContext.Categories
                .FirstOrDefaultAsync(i => (int)i.CategoryName == request.Category, cancellationToken);

        if (category is null)
            throw new SongBadCategoryException("Category not found");

        if (string.IsNullOrEmpty(request.SongName) || string.IsNullOrWhiteSpace(request.SongName))
            throw new SongBadRequestException("Wrong song name was provided");

        if (request.Duration < 0)
            throw new SongBadRequestException("Wrong song duration was provided");

        var newSong = new Song(request.SongName, request.Duration, category);

        if (request.ImageId is not null)
        {
            var imageFromDb = await _dbContext.Files
                .FirstOrDefaultAsync(i => i.Id == request.ImageId.Value,
                    cancellationToken: cancellationToken);

            if (imageFromDb is null)
                throw new SongBadRequestException("Image not found");
            
            if (!_fileHelper.IsImage(imageFromDb))
                throw new SongBadImageException("File's content type is not Image");

            newSong.Image = imageFromDb;
        }

        var userId = _userContext.CurrentUserId;

        if (userId is null)
            throw new SongInternalException("Current user not found");

        var userFromDb = await _dbContext.Users
            .FirstOrDefaultAsync(i => i.Id == userId, cancellationToken);

        if (userFromDb is null)
            throw new BadSongAuthorException("Current user not found");

        newSong.AddAuthor(userFromDb);
        await _dbContext.Songs.AddAsync(newSong, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}