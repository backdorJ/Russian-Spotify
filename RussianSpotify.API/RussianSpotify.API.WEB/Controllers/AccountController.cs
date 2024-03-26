using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Account.GetUserInfo;
using RussianSpotify.Contracts.Requests.Account.GetUserInfo;
using RussianSpotify.Contracts.Requests.Account.PostLogin;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер отвечающий за действия с аккаунтом
/// </summary>
[ApiController]
[Route("api/[controller]/")]
public class AccountController : ControllerBase
{
    private readonly IMediator _mediator;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="mediator">Медиатор из библиотеки MediatR</param>
    public AccountController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Возвращает GetUserInfoResponse(Email, UserName)
    /// </summary>
    /// <returns>GetUserInfoResponse(Email, UserName)</returns>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если пользователь с CurrentUserId из JWT Claims не найден, или этого CurrentUserId нет</response>
    /// <response code="401">Если пользователь не авторизован</response>
    [HttpGet("UserInfo")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<GetUserInfoResponse> UserInfo()
    {
        var command = new GetUserInfoQuery();
        return await _mediator.Send(command);
    }
}