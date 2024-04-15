using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

namespace RussianSpotify.API.Core.Requests.Author.GetAuthorsByFilter;

/// <summary>
/// Обработчик запроса <see cref="GetAuthorsByFilterRequest"/>
/// </summary>
public class GetAuthorsByFilterQueryHandler : IRequestHandler<GetAuthorsByFilterQuery, GetAuthorsByFilterResponse>
{
    private readonly IDbContext _dbContext;
    private readonly IFilterHandler _filterHandler;
    private readonly IRoleManager _roleManager;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст базы данных</param>
    /// <param name="roleManager">Сервис для работы с ролями пользователей</param>
    /// <param name="filterHandler">Сервис для фильтра сущностей</param>
    public GetAuthorsByFilterQueryHandler(IDbContext dbContext, IRoleManager roleManager, IFilterHandler filterHandler)
    {
        _dbContext = dbContext;
        _roleManager = roleManager;
        _filterHandler = filterHandler;
    }

    /// <inheritdoc/>
    public async Task<GetAuthorsByFilterResponse> Handle(GetAuthorsByFilterQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var query = _dbContext.Users.AsQueryable();

        var filteredAuthors =
            await _filterHandler.GetByFilterAsync(query, request.FilterName, request.FilterValue, cancellationToken);

        var totalCount = await filteredAuthors.CountAsync(cancellationToken);

        var filteredAuthorsToList = await filteredAuthors
            .Include(i => i.AuthorPlaylists)
            .ToListAsync(cancellationToken);

        var resultAuthors = filteredAuthorsToList
            .Where(i => _roleManager.IsInRole(i, BaseRoles.AuthorRoleName))
            .Select(i => new GetAuthorsByFilterResponseItem
            {
                AuthorId = i.Id,
                AuthorName = i.UserName ?? "",
                ImageId = i.UserPhotoId ?? new Guid(),
                Albums = i.AuthorPlaylists
                    .Take(request.PlaylistCount)
                    .Select(i => new GetAuthorsByFilterResponseItemPlaylist
                    {
                        PlaylistId = i.Id,
                        PlaylistName = i.PlaylistName
                    }).ToList(),
                TotalAlbumCount = i.AuthorPlaylists.Count
            })
            .ToList();

        return new GetAuthorsByFilterResponse(resultAuthors, totalCount);
    }
}