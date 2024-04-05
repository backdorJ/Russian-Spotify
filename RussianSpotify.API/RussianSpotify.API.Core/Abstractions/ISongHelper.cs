using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Abstractions;

public interface ISongHelper
{
    Task<bool> IsAuthorAsync(Song song, Guid authorId, CancellationToken cancellationToken);
    bool IsAuthor(Song song, User author);
}