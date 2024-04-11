using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.Contracts.Requests.Music.GetPlaylistsByFilter;

namespace RussianSpotify.API.Core.Requests.Music.GetPlaylistsByFilter;

public class GetPlaylistsByFilterQueryHandler(IDbContext dbContext, IFilterHandler filterHandler) 
    : IRequestHandler<GetPlaylistsByFilterQuery, List<GetPlaylistsByFilterResponse>>
{
    public async Task<List<GetPlaylistsByFilterResponse>> Handle(GetPlaylistsByFilterQuery request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var query = dbContext.Playlists.AsQueryable();

        var filteredPlaylists =
            await filterHandler.GetByFilterAsync(query, request.FilterName, request.FilterValue, cancellationToken);
        
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