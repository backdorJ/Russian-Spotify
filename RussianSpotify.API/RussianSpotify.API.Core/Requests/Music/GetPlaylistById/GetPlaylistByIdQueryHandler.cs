using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.Contracts.Requests.Playlist.GetFavouritePlaylistById;

namespace RussianSpotify.API.Core.Requests.Music.GetPlaylistById;

/// <summary>
/// Обработчик для <see cref="GetPlaylistByIdQuery"/>
/// </summary>
public class GetPlaylistByIdQueryHandler
    : IRequestHandler<GetPlaylistByIdQuery, GetFavouritePlaylistByIdResponse>
{
    private readonly IUserContext _userContext;
    private readonly IDbContext _dbContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="userContext">Контекст пользователя</param>
    /// <param name="dbContext">Контекст БД</param>
    public GetPlaylistByIdQueryHandler(IUserContext userContext, IDbContext dbContext)
    {
        _userContext = userContext;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<GetFavouritePlaylistByIdResponse> Handle(
        GetPlaylistByIdQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        var playlist = await _dbContext.Playlists
            .Include(x => x.Author)
            .Include(x => x.Songs)
            .FirstOrDefaultAsync(x => x.Id == request.PlaylistId, cancellationToken)
            ?? throw new EntityNotFoundException<Entities.Playlist>(request.PlaylistId);

        return new GetFavouritePlaylistByIdResponse
        {
            PlaylistName = playlist.PlaylistName,
            ImageId = playlist.ImageId,
            IsAlbum = playlist.IsAlbum,
            AuthorName = playlist.Author?.UserName,
            ReleaseDate = playlist.ReleaseDate,
            SongsIds = playlist.Songs?
                .Select(x => x.Id)
                .ToList()
        };
    }
}