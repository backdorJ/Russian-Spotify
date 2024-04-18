using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;

namespace RussianSpotify.API.Core.Requests.Playlist.PutPlaylist;

/// <summary>
/// Обработчик для <see cref="PutPlaylistCommand"/>
/// </summary>
public class PutPlaylistCommandHandler : IRequestHandler<PutPlaylistCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="userContext">Контекст пользователя</param>
    public PutPlaylistCommandHandler(
        IDbContext dbContext,
        IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    /// <inheritdoc />
    public async Task Handle(PutPlaylistCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        var playlist = await _dbContext.Playlists
            .Include(x => x.Songs)
            .Where(x => x.AuthorId == _userContext.CurrentUserId)
            .FirstOrDefaultAsync(x => x.Id == request.PlaylistId, cancellationToken)
            ?? throw new EntityNotFoundException<Entities.Playlist>(request.PlaylistId);

        if (playlist.Songs is null)
            throw new ApplicationBaseException("У данного плейлиста нет песен");

        var songsToDelete = playlist.Songs
            .Select(x => x.Id)
            .ToList()
            .Except(request.SongsIds ?? playlist.Songs
                .Select(x => x.Id)
                .ToList())
            .ToList();
        
        playlist.Songs.ForEach(x =>
        {
            if (songsToDelete.Contains(x.Id))
                playlist.Songs.Remove(x);
        });

        if (request.SongsIds == null || !request.SongsIds.Any())
            return;

        foreach (var songId in request.SongsIds)
        {
            if (playlist.Songs.Select(x => x.Id).Contains(songId))
                continue;
            
            var newSong = await _dbContext.Songs
                .FirstOrDefaultAsync(x => x.Id == songId, cancellationToken)
                ?? throw new EntityNotFoundException<Song>(songId); 
            
            playlist.Songs.Add(newSong);
        }

        playlist.PlaylistName = request.PlaylistName ?? playlist.PlaylistName;
        playlist.ImageId = request.ImageId ?? playlist.ImageId;

        await _dbContext.SaveChangesAsync(cancellationToken);   
    }
}