using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Extensions;
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

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="filterHandler">Маршрутизатор фильтров</param>
    /// <param name="userContext">Контекст юзера</param>
    public GetPlaylistsByFilterQueryHandler(
        IDbContext dbContext,
        IFilterHandler filterHandler,
        IUserContext userContext)
    {
        _dbContext = dbContext;
        _filterHandler = filterHandler;
        _userContext = userContext;
    }

    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<GetPlaylistsByFilterResponse> Handle(GetPlaylistsByFilterQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var userId = _userContext.CurrentUserId;

        if (userId is null)
            throw new CurrentUserIdNotFound("UserId из Claims не был найден");

        var query = _dbContext.Playlists.AsQueryable();

        // ВАЖНО: На случай если придется делать include у плейлистов,
        // то перемешка по Guid.NewGuid() не подходит, ибо она падает
        // с инклудом(лефт джоин), поэтому надо будет переписать 
        // этот хендлер с использованием Distinct() у IEnumerable
        // и поставить Count после Distinct()
        var filteredPlaylists =
            await _filterHandler.GetByFilterAsync(query, request.FilterName, request.FilterValue, cancellationToken);

        var totalCount = await filteredPlaylists.CountAsync(cancellationToken: cancellationToken);
        Console.WriteLine(request.PageSize);
        Console.WriteLine(request.PageNumber);
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
            .SkipTake(request)
            .ToListAsync(cancellationToken);

        return new GetPlaylistsByFilterResponse(resultPlaylists, totalCount);
    }
}