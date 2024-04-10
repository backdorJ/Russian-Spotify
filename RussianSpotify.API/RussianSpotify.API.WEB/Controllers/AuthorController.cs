using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Author.GetAuthor;
using RussianSpotify.Contracts.Requests.Author.GetAuthor;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер, отвечающий за действия связанные с авторами
/// </summary>
/// <param name="mediator"></param>
[ApiController]
[Route("api/[controller]")]
public class AuthorController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Возвращает информацию об авторе
    /// </summary>
    /// <param name="request">Имя автора</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Информация об авторе - его имя и id фотографии профиля</returns>
    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<GetAuthorResponse> Author([FromQuery] GetAuthorRequest request, CancellationToken cancellationToken)
    {
        var query = new GetAuthorQuery(request);
        return await mediator.Send(query, cancellationToken);
    }
}