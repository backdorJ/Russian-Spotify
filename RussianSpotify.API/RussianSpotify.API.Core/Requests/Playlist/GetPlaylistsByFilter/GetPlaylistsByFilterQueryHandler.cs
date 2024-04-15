using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.Contracts.Requests.Playlist.GetAllFavouriteAlbumAndPlaylist;
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

    public GetPlaylistsByFilterQueryHandler(IDbContext dbContext, IFilterHandler filterHandler)
    {
        _dbContext = dbContext;
        _filterHandler = filterHandler;
    }
    
    public async Task<GetPlaylistsByFilterResponse> Handle(GetPlaylistsByFilterQuery request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var query = _dbContext.Playlists.AsQueryable();

        var filteredPlaylists =
            await _filterHandler.GetByFilterAsync(query, request.FilterName, request.FilterValue, cancellationToken);

        var totalCount = await filteredPlaylists.CountAsync(cancellationToken: cancellationToken);
        
        var resultPlaylists = await filteredPlaylists
            .Select(x => new GetAllFavouriteAlbumAndPlaylistResponseItem()
            {
                Id = x.Id,
                PlaylistName = x.PlaylistName,
                ImageId = x.ImageId,
                AuthorName = x.Author!.UserName,
                ReleaseDate = x.ReleaseDate,
                IsAlbum = x.IsAlbum
            })
            .ToListAsync(cancellationToken);

        return new GetPlaylistsByFilterResponse(resultPlaylists, totalCount);
    }
}