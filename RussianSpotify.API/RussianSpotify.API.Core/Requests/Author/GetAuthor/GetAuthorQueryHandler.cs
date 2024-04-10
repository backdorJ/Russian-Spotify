using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.Contracts.Requests.Author.GetAuthor;

namespace RussianSpotify.API.Core.Requests.Author.GetAuthor;

/// <summary>
/// Обработчик для <see cref="GetAuthorQuery"/>
/// </summary>
/// <param name="dbContext">Контекст БД</param>
/// <param name="roleManager">Менеджер ролей</param>
public class GetAuthorQueryHandler(IDbContext dbContext, IRoleManager roleManager)
    : IRequestHandler<GetAuthorQuery, GetAuthorResponse>
{
    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<GetAuthorResponse> Handle(GetAuthorQuery request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        var usersWithSameNames = await dbContext.Users
            .AsNoTracking()
            .Where(x => x.UserName!.ToLower() == request.Name.ToLower())
            .ToListAsync(cancellationToken);

        var author = usersWithSameNames
            .FirstOrDefault(x => roleManager.IsInRole(x, BaseRoles.AuthorRoleName));
        
        if (author is null)
            throw new NotFoundException($"Автор с именем: {request.Name} не найден");

        return new GetAuthorResponse
        {
            Name = author.UserName!,
            AuthorPhotoId = author.UserPhotoId
        };
    }
}