using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Requests.Music.PatchEditSong;

public class PatchEditSongCommandHandler : IRequestHandler<PatchEditSongCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;
    private readonly IFileHelper _fileHelper;
    private readonly ISongHelper _songHelper;

    public PatchEditSongCommandHandler(IDbContext dbContext, IFileHelper fileHelper, IUserContext userContext, ISongHelper songHelper)
    {
        _dbContext = dbContext;
        _fileHelper = fileHelper;
        _userContext = userContext;
        _songHelper = songHelper;
    }

    public async Task Handle(PatchEditSongCommand request, CancellationToken cancellationToken)
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
        
        if (!string.IsNullOrEmpty(request.SongName) &&
            !string.IsNullOrWhiteSpace(request.SongName))
            songFromDb.SongName = request.SongName;

        if (request.Duration is not null)
        {
            if (request.Duration < 0)
                throw new SongBadRequestException("Wrong song duration was provided");
            songFromDb.Duration = request.Duration.Value;
        }

        if (request.Category is not null)
        {
            var categoryFromDb = await _dbContext.Categories
                .FirstOrDefaultAsync(i => (int)i.CategoryName == request.Category, cancellationToken);

            if (categoryFromDb is null)
                throw new SongBadCategoryException("Category not found");

            songFromDb.Category = categoryFromDb;
        }

        if (request.ImageId is not null)
        {
            var fileFromDb = await _dbContext.Files
                .FirstOrDefaultAsync(i => i.Id == request.ImageId.Value, cancellationToken);

            if (fileFromDb is null)
                throw new SongBadImageException("File not found");
            
            if (!_fileHelper.IsImage(fileFromDb))
                throw new SongBadImageException("File's content type is not Image");
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}