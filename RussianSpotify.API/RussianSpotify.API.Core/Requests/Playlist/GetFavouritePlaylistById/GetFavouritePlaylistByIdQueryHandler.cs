using System.Threading.Channels;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.Contracts.Requests.Playlist.GetFavouritePlaylistById;

namespace RussianSpotify.API.Core.Requests.Playlist.GetFavouritePlaylistById;

/// <summary>
/// Обработчик для <see cref="GetFavouritePlaylistByIdQuery"/>
/// </summary>
public class GetFavouritePlaylistByIdQueryHandler
    : IRequestHandler<GetFavouritePlaylistByIdQuery, GetFavouritePlaylistByIdResponse>
{
    private readonly IUserContext _userContext;
    private readonly IDbContext _dbContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="userContext">Контекст пользователя</param>
    /// <param name="dbContext">Контекст БД</param>
    public GetFavouritePlaylistByIdQueryHandler(IUserContext userContext, IDbContext dbContext)
    {
        _userContext = userContext;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<GetFavouritePlaylistByIdResponse> Handle(
        GetFavouritePlaylistByIdQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        var playlist = await _dbContext.Playlists
                           .Include(x => x.Author)
                           .Include(x => x.Songs)
                           .Where(x => x.Users!.Select(y => y.Id).Contains(_userContext.CurrentUserId!.Value))
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