using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.Contracts.Requests.Music.GetAllFavouriteAlbumAndPlaylist;

namespace RussianSpotify.API.Core.Requests.Music.GetAllFavouriteAlbumAndPlaylist;

/// <summary>
/// Обработчик для <see cref="GetAllFavouriteAlbumAndPlaylistQuery"/>
/// </summary>
public class GetAllFavouriteAlbumAndPlaylistQueryHandler
    : IRequestHandler<GetAllFavouriteAlbumAndPlaylistQuery, List<GetAllFavouriteAlbumAndPlaylistResponse>>
{
    private readonly IUserContext _userContext;
    private readonly IDbContext _dbContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="userContext">Контекст пользователя</param>
    /// <param name="dbContext">Контекст БД</param>
    public GetAllFavouriteAlbumAndPlaylistQueryHandler(
        IUserContext userContext,
        IDbContext dbContext)
    {
        _userContext = userContext;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<List<GetAllFavouriteAlbumAndPlaylistResponse>> Handle(
        GetAllFavouriteAlbumAndPlaylistQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        var currentUser = await _dbContext.Users
            .Include(x => x.Playlists)!
                .ThenInclude(y =>  y.Author)
            .FirstOrDefaultAsync(x => x.Id == _userContext.CurrentUserId, cancellationToken)
            ?? throw new EntityNotFoundException<User>(_userContext.CurrentUserId!.Value);

        return (currentUser.Playlists ?? new())
            .Select(x => new GetAllFavouriteAlbumAndPlaylistResponse
            {
                PlaylistName = x.PlaylistName,
                ImageId = x.ImageId,
                IsAlbum = x.IsAlbum,
                AuthorName = x.Author?.UserName,
                ReleaseDate = x.ReleaseDate
            })
            .ToList();
    }
}