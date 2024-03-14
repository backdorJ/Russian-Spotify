using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Requests.OAuthAccount.GetExternalLoginCallback;
using RussianSpotify.Contracts.Requests.OAuthAccount.GetExternalLoginCallback;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер отвечающий за авторизацию и регистрацию через сторонние сервисы 
/// </summary>
[ApiController]
[Route("api/[controller]/")]
[AllowAnonymous]
public class OAuthAccountController : ControllerBase
{
    private readonly IMediator _mediator;

    /// <inheritdoc cref="ControllerBase"/>

    public OAuthAccountController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Редирект пользователя на логин страницу стороннего сервиса
    /// </summary>
    /// <param name="provider">Имя провайдера(Vkontakte, Yandex, Google)</param>
    /// <param name="signInManager">SignInManager для User</param>
    /// <returns>Challenge Result</returns>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="500">Если не удалось залогиниться через стороннего провайдера</response>
    [HttpGet("ExternalLogin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult ExternalLogin([FromQuery] string provider, [FromServices] SignInManager<User> signInManager)
    {
        var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "OAuthAccount");
        var properties = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        return Challenge(properties, provider);
    }
    
    /// <summary>
    /// Логин через сторонний сервис
    /// </summary>
    /// <returns>GetExternalLoginCallbackResponse(JWT, Refresh Token)</returns>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если не удалось аутентифицироваться через сторонний сервис
    /// или пользовательские данные не удовлетворяют требованиям Identity</response>
    [HttpGet("ExternalLoginCallback")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<GetExternalLoginCallbackResponse> ExternalLoginCallback()
    {
        var command = new GetExternalLoginCallbackCommand();
        return await _mediator.Send(command);
    }
}