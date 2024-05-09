using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.Contracts.Requests.Author.GetAuthor;

namespace RussianSpotify.API.Core.Requests.Author.GetAuthor;

/// <summary>
/// Обработчик для <see cref="GetAuthorQuery"/>
/// </summary>
public class GetAuthorQueryHandler
    : IRequestHandler<GetAuthorQuery, GetAuthorResponse>
{
    private readonly IDbContext _dbContext;
    private readonly IRoleManager _roleManager;

    public GetAuthorQueryHandler(IDbContext dbContext, IRoleManager roleManager)
    {
        _dbContext = dbContext;
        _roleManager = roleManager;
    }

    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<GetAuthorResponse> Handle(GetAuthorQuery request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var usersWithSameNames = await _dbContext.Users
            .AsNoTracking()
            .Where(x => x.UserName!.ToLower().Equals(request.Name.ToLower()))
            .ToListAsync(cancellationToken);

        User? author = null;
        
        foreach (var userWithSameName in usersWithSameNames)
        {
            if (await _roleManager.IsInRoleAsync(userWithSameName, BaseRoles.AuthorRoleName, cancellationToken))
                author = userWithSameName;
        }

        if (author is null)
            throw new NotFoundException($"Автор с именем: {request.Name} не найден");

        return new GetAuthorResponse
        {
            Name = author.UserName!,
            AuthorPhotoId = author.UserPhotoId
        };
    }
}