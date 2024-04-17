using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.Contracts.Requests.Playlist.GetPlaylistsByFilter;

namespace RussianSpotify.API.Core.Requests.Playlist.GetPlaylistsByFilter;

/// <summary>
/// Обработчик для <see cref="GetPlaylistsByFilterQuery"/>
/// </summary>
public class GetPlaylistsByFilterQueryHandler 
    : IRequestHandler<GetPlaylistsByFilterQuery, GetPlaylistsByFilterResponse>
{
    private readonly IDbContext _dbContext;
    private readonly IFilterHandler _filterHandler;
    private readonly IUserContext _userContext;

    public GetPlaylistsByFilterQueryHandler(IDbContext dbContext, IFilterHandler filterHandler, IUserContext userContext)
    {
        _dbContext = dbContext;
        _filterHandler = filterHandler;
        _userContext = userContext;
    }
    
    public async Task<GetPlaylistsByFilterResponse> Handle(GetPlaylistsByFilterQuery request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var userId = _userContext.CurrentUserId;

        if (userId is null)
            throw new CurrentUserIdNotFound("UserId из Claims не был найден");
        
        var query = _dbContext.Playlists.AsQueryable();

        var filteredPlaylists =
            await _filterHandler.GetByFilterAsync(query, request.FilterName, request.FilterValue, cancellationToken);

        var totalCount = await filteredPlaylists.CountAsync(cancellationToken: cancellationToken);
        
        var resultPlaylists = await filteredPlaylists
            .Include(playlist => playlist.Users)
            .Select(playlist => new GetPlaylistsByFilterResponseItem
            {
                Id = playlist.Id,
                PlaylistName = playlist.PlaylistName,
                ImageId = playlist.ImageId,
                AuthorName = playlist.Author!.UserName,
                ReleaseDate = playlist.ReleaseDate,
                IsAlbum = playlist.IsAlbum,
                IsInFavorite = playlist.Users!.Any(user => user.Id.Equals(userId.Value))
            })
            .ToListAsync(cancellationToken);

        return new GetPlaylistsByFilterResponse(resultPlaylists, totalCount);
    }
}