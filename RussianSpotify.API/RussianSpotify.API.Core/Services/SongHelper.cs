using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Services;

public class SongHelper : ISongHelper
{
    private readonly IDbContext _dbContext;

    public SongHelper(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> IsAuthorAsync(Song song, Guid authorId, CancellationToken cancellationToken)
    {
        var currentUserFromDb = await _dbContext.Users
            .FirstOrDefaultAsync(i => i.Id == authorId, cancellationToken);

        if (currentUserFromDb is null)
            throw new SongInternalException("Current user not found");

        return IsAuthor(song, currentUserFromDb);
    }

    public bool IsAuthor(Song song, User author)
    {
        return song.Authors.Contains(author);
    }
}