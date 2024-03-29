using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Account.GetUserInfo;
using RussianSpotify.API.Core.Requests.Account.PatchUpdateUserInfo;
using RussianSpotify.Contracts.Requests.Account.GetUserInfo;
using RussianSpotify.Contracts.Requests.Account.PatchUpdateUserInfo;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер отвечающий за действия с аккаунтом
/// </summary>
[ApiController]
[Authorize]
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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<GetUserInfoResponse> UserInfo(CancellationToken cancellationToken)
    {
        var command = new GetUserInfoQuery();
        return await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Обновление данных пользователя
    /// </summary>
    /// <param name="request">PatchUpdateUserInfoRequest(UserName, CurrentPassword, NewPassword, NewPasswordConfirm)</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если пользователь с CurrentUserId из JWT Claims не найден,
    /// или этого CurrentUserId нет, если текущий пароль пользователя неверный,
    /// если новый пароль и его подтверждение не совпадают</response>
    /// <response code="401">Если пользователь не авторизован</response>
    [HttpPatch("UpdateUserInfo")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task UpdateUserInfo([FromBody] PatchUpdateUserInfoRequest request, CancellationToken cancellationToken)
    {
        var command = new PatchUpdateUserInfoCommand(request);
        await _mediator.Send(command, cancellationToken);
    }
}