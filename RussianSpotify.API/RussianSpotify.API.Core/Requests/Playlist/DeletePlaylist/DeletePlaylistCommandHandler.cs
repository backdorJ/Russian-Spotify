using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.Playlist;
using RussianSpotify.Contracts.Requests.Playlist.DeletePlaylist;

namespace RussianSpotify.API.Core.Requests.Playlist.DeletePlaylist;

public class DeletePlaylistCommandHandler : IRequestHandler<DeletePlaylistCommand, DeletePlaylistResponse>
{
    private readonly IDbContext _dbContext;
    private readonly IFileHelper _fileHelper;
    private readonly IUserContext _userContext;

    public DeletePlaylistCommandHandler(IDbContext dbContext, IFileHelper fileHelper, IUserContext userContext)
    {
        _dbContext = dbContext;
        _fileHelper = fileHelper;
        _userContext = userContext;
    }

    public async Task<DeletePlaylistResponse> Handle(DeletePlaylistCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        var playlistFromDb = await _dbContext.Playlists
            .Include(i => i.Image)
            .FirstOrDefaultAsync(i => i.Id == request.PlaylistId, cancellationToken);

        if (playlistFromDb is null)
            throw new PlaylistBadRequestException("Playlist not found");

        var currentUserId = _userContext.CurrentUserId;

        if (currentUserId is null)
            throw new InternalException("Current user not found");

        if (playlistFromDb.AuthorId != currentUserId)
            throw new PlaylistForbiddenException("You're not author of this playlist");
        
        var result = new DeletePlaylistResponse
        {
            PlaylistId = playlistFromDb.Id,
            PlaylistName = playlistFromDb.PlaylistName
        };
        
        if (playlistFromDb.Image is not null)
            await _fileHelper.DeleteFileAsync(playlistFromDb.Image, cancellationToken);

        _dbContext.Playlists.Remove(playlistFromDb);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return result;
    }
}