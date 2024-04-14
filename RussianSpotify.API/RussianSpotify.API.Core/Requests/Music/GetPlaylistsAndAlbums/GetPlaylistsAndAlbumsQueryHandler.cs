using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.Contracts.Requests.Music.GetPlaylistsAndAlbums;

namespace RussianSpotify.API.Core.Requests.Music.GetPlaylistsAndAlbums;

/// <summary>
/// Обработчик для <see cref="GetPlaylistsAndAlbumsQuery"/>
/// </summary>
public class GetPlaylistsAndAlbumsQueryHandler
    : IRequestHandler<GetPlaylistsAndAlbumsQuery, GetPlaylistsAndAlbumsResponse>
{
    private readonly IUserContext _userContext;
    private readonly IDbContext _dbContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="userContext">Контекст пользователя</param>
    /// <param name="dbContext">Контекст БД</param>
    public GetPlaylistsAndAlbumsQueryHandler(
        IUserContext userContext,
        IDbContext dbContext)
    {
        _userContext = userContext;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<GetPlaylistsAndAlbumsResponse> Handle(
        GetPlaylistsAndAlbumsQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var playlists = request.IsFavourite
            ? _dbContext.Playlists
                .Where(x => x.Users!
                    .Select(y => y.Id)
                    .Contains(_userContext.CurrentUserId!.Value))
                .AsQueryable()
            : _dbContext.Playlists
                .AsQueryable();

        var totalCount = await playlists.CountAsync(cancellationToken);
        
        var result = await playlists
            .Select(x => new GetPlaylistsAndAlbumsResponseItem
            {
                Id = x.Id,
                PlaylistName = x.PlaylistName,
                ImageId = x.ImageId,
                IsAlbum = x.IsAlbum,
                AuthorName = x.Author!.UserName,
                ReleaseDate = x.ReleaseDate
            })
            .SkipTake(request)
            .ToListAsync(cancellationToken);

        return new GetPlaylistsAndAlbumsResponse(result, totalCount);
    }
}