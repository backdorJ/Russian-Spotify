using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.Contracts.Requests.Music.GetPlaylistsByFilter;

namespace RussianSpotify.API.Core.Requests.Music.GetPlaylistsByFilter;

/// <summary>
/// Обработчик для <see cref="GetPlaylistsByFilterQuery"/>
/// </summary>
public class GetPlaylistsByFilterQueryHandler 
    : IRequestHandler<GetPlaylistsByFilterQuery, List<GetPlaylistsByFilterResponse>>
{
    private readonly IDbContext _dbContext;
    private readonly IFilterHandler _filterHandler;

    public GetPlaylistsByFilterQueryHandler(IDbContext dbContext, IFilterHandler filterHandler)
    {
        _dbContext = dbContext;
        _filterHandler = filterHandler;
    }
    
    public async Task<List<GetPlaylistsByFilterResponse>> Handle(GetPlaylistsByFilterQuery request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var query = _dbContext.Playlists.AsQueryable();

        var filteredPlaylists =
            await _filterHandler.GetByFilterAsync(query, request.FilterName, request.FilterValue, cancellationToken);

        return await filteredPlaylists
            .Select(x => new GetPlaylistsByFilterResponse
            {
                PlaylistName = x.PlaylistName,
                ImageId = x.ImageId,
                AuthorName = x.Author!.UserName,
                ReleaseDate = x.ReleaseDate
            })
            .ToListAsync(cancellationToken);
    }
}