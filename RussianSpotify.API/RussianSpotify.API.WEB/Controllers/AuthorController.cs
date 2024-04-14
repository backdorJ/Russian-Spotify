using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Author.GetAuthor;
using RussianSpotify.API.Core.Requests.Author.GetAuthorsByFilter;
using RussianSpotify.Contracts.Requests.Author.GetAuthor;
using RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер, отвечающий за действия связанные с авторами
/// </summary>
[ApiController]
[Route("api/[controller]/[action]")]
public class AuthorController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthorController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
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
        return await _mediator.Send(query, cancellationToken);
    }

    /// <summary>
    /// Возвращает авторов, отфильтрованных по конкретному фильтру
    /// </summary>
    /// <param name="request">Запрос с информацией о запросе</param>
    /// <returns><see cref="GetAuthorsByFilterResponse"/> с инфой об авторе</returns>
    [HttpGet]
    public async Task<GetAuthorsByFilterResponse> GetAuthorsByFilterAsync([FromQuery] GetAuthorsByFilterRequest request)
    {
        var query = new GetAuthorsByFilterQuery(request);
        return await _mediator.Send(query);
    }
}