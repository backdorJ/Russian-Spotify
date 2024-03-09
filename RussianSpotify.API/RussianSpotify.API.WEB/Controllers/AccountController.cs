using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Account.PostLogin;
using RussianSpotify.API.Core.Requests.Account.PostRegister;
using RussianSpotify.Contracts.Requests.Account.PostLogin;
using RussianSpotify.Contracts.Requests.Account.PostRegister;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер отвечающий за авторизацию и регистрацию
/// </summary>
[AllowAnonymous]
[ApiController]
[Route("api/[controller]/")]
public class AccountController : ControllerBase
{
    private readonly IMediator _mediator;

    public AccountController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Логинит пользователя и возвращает JWT токен, если пользователь залогинился
    /// </summary>
    /// <param name="request">Post Login Request(Email и Password)</param>
    /// <param name="cancellationToken"></param>
    /// <returns>JWT токен</returns>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если у пользователя некорректные данные, которые не прошли валидацию</response>
    /// <response code="401">Если у пользователя некорректные данные(неверная почта или пароль)</response>
    [HttpPost("Login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<PostLoginResponse> Login([FromBody] PostLoginRequest request, CancellationToken cancellationToken)
    {
        var command = new PostLoginCommand(request);
        return await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Регистрация пользователя
    /// </summary>
    /// <param name="register">Post Register Request(Email, UserName, Password, PasswordConfirm)</param>
    /// <param name="cancellationToken"></param>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если у пользователя некорректные данные, которые не прошли валидацию</response>
    /// <response code="500">Если пользователь уже есть в системе</response>
    [HttpPost("Register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task Register([FromBody] PostRegisterRequest register, CancellationToken cancellationToken)
    {
        var command = new PostRegisterCommand(register);
        await _mediator.Send(command, cancellationToken);
    }
}