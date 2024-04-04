using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Requests.Music.PostAddSong;

public class PostAddSongCommandHandler : IRequestHandler<PostAddSongCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;

    public PostAddSongCommandHandler(IDbContext dbContext, IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    public async Task Handle(PostAddSongCommand request, CancellationToken cancellationToken)
    {
        var category = _dbContext.Categories.FirstOrDefault(i => (int)i.CategoryName == request.Category);

        if (category is null)
            throw new WrongCategoryException("Category not found");

        if (string.IsNullOrEmpty(request.SongName) || string.IsNullOrWhiteSpace(request.SongName))
            throw new SongBadRequest("Wrong song name was provided");

        if (request.Duration < 0)
            throw new SongBadRequest("Wrong song duration was provided");

        var newSong = new Song(request.SongName, request.Duration, category);

        if (request.ImageId is not null)
        {
            var image = await _dbContext.Files
                .FirstOrDefaultAsync(i => i.Id == request.ImageId.Value,
                    cancellationToken: cancellationToken);

            if (image is null)
                throw new SongBadRequest("Image not found");

            newSong.SetImage(image);
        }

        var userId = _userContext.CurrentUserId;

        if (userId is null)
            throw new SongInternalException("Current user not found");

        var userFromDb = await _dbContext.Users
            .FirstOrDefaultAsync(i => i.Id == userId, cancellationToken);

        if (userFromDb is null)
            throw new SongAuthorNotFound("Current user not found");
        
        newSong.AddAuthor(userFromDb);
        await _dbContext.Songs.AddAsync(newSong, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}