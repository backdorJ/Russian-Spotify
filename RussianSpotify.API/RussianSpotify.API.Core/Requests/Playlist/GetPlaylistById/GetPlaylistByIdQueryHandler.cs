using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.Contracts.Requests.Playlist.GetFavouritePlaylistById;

namespace RussianSpotify.API.Core.Requests.Playlist.GetPlaylistById;

/// <summary>
/// Обработчик для <see cref="GetPlaylistByIdQuery"/>
/// </summary>
public class GetPlaylistByIdQueryHandler
    : IRequestHandler<GetPlaylistByIdQuery, GetFavouritePlaylistByIdResponse>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="userContext">Контекст юзера</param>
    public GetPlaylistByIdQueryHandler(IDbContext dbContext, IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    /// <inheritdoc />
    public async Task<GetFavouritePlaylistByIdResponse> Handle(
        GetPlaylistByIdQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var userId = _userContext.CurrentUserId;

        if (userId is null)
            throw new CurrentUserIdNotFound("UserId из Claims не был найден");

        var playlist = await _dbContext.Playlists
                           .Include(x => x.Author)
                           .Include(x => x.Songs)
                           .Include(x => x.Users)
                           .FirstOrDefaultAsync(x => x.Id == request.PlaylistId, cancellationToken)
                       ?? throw new EntityNotFoundException<Entities.Playlist>(request.PlaylistId);

        return new GetFavouritePlaylistByIdResponse
        {
            PlaylistName = playlist.PlaylistName,
            ImageId = playlist.ImageId,
            IsAlbum = playlist.IsAlbum,
            AuthorId = playlist.AuthorId,
            AuthorName = playlist.Author?.UserName,
            ReleaseDate = playlist.ReleaseDate,
            IsInFavorite = playlist.Users!.Any(user => user.Id.Equals(userId.Value))
        };
    }
}