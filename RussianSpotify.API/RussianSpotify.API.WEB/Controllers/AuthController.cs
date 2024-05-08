using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Account.PostConfirmEmail;
using RussianSpotify.API.Core.Requests.Account.PostLogin;
using RussianSpotify.API.Core.Requests.Account.PostRefreshToken;
using RussianSpotify.API.Core.Requests.Account.PostRevokeToken;
using RussianSpotify.API.Core.Requests.Auth.PostConfirmPasswordReset;
using RussianSpotify.API.Core.Requests.Auth.PostRegister;
using RussianSpotify.API.Core.Requests.Auth.PostResetPassword;
using RussianSpotify.API.Core.Requests.Auth.PostValidatePasswordResetConfirmationToken;
using RussianSpotify.Contracts.Requests.Account.PostConfirmEmail;
using RussianSpotify.Contracts.Requests.Account.PostLogin;
using RussianSpotify.Contracts.Requests.Account.PostRefreshToken;
using RussianSpotify.Contracts.Requests.Account.PostRegister;
using RussianSpotify.Contracts.Requests.Account.PostRevokeToken;
using RussianSpotify.Contracts.Requests.Auth.PostConfirmPasswordReset;
using RussianSpotify.Contracts.Requests.Auth.PostRegister;
using RussianSpotify.Contracts.Requests.Auth.PostResetPassword;
using RussianSpotify.Contracts.Requests.Auth.PostValidatePasswordResetConfirmationToken;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер отвечающий за авторизацию и регистрацию
/// </summary>
[ApiController]
[Route("api/[controller]/")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="mediator"></param>
    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

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
    public async Task<PostLoginResponse> Login([FromBody] PostLoginRequest request,
        CancellationToken cancellationToken)
    {
        var command = new PostLoginCommand(request);
        var response = await _mediator.Send(command, cancellationToken);
        return response;
    }

    /// <summary>
    /// Регистрация пользователя
    /// </summary>
    /// <param name="request">Post Register Request(Email, UserName, Password, PasswordConfirm)</param>
    /// <param name="cancellationToken"></param>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если у пользователя некорректные данные, которые не прошли валидацию</response>
    /// <response code="500">Если пользователь уже есть в системе</response>
    [HttpPost("Register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<PostRegisterResponse> Register([FromBody] PostRegisterRequest request,
        CancellationToken cancellationToken)
    {
        var command = new PostRegisterCommand(request);
        return await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Сброс пароля
    /// </summary>
    /// <param name="request">Post Reset Request(Email)</param>
    /// <param name="cancellationToken"></param>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если у пользователя некорректные данные, которые не прошли валидацию</response>
    /// <response code="500">Если не получилось изменить пароль</response>
    [HttpPost("ResetPassword")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<PostResetPasswordResponse> ResetPassword([FromBody] PostResetPasswordRequest request,
        CancellationToken cancellationToken)
    {
        var command = new PostResetPasswordCommand(request);
        return await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Обновление JWT
    /// </summary>
    /// <param name="request">Post Refresh Token Request(JWT, Refresh Token)</param>
    /// <param name="cancellationToken"></param>
    /// <returns>Post Refresh Token Response(JWT, Refresh Token)</returns>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если у пользователя просрочен RefreshToken или в JWT нет нужных Claims</response>
    [HttpPost("RefreshToken")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<PostRefreshTokenResponse> RefreshToken([FromBody] PostRefreshTokenRequest request,
        CancellationToken cancellationToken)
    {
        var command = new PostRefreshTokenCommand(request);
        return await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Удаление Refresh Token
    /// </summary>
    /// <param name="request">PostRevokeTokenRequest(Email)</param>
    /// <param name="cancellationToken"></param>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если пользователя с таким Email нет</response>
    /// <response code="401">Если пользователь не авторизован</response>
    [Authorize]
    [HttpPost("RevokeToken")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task RevokeToken([FromBody] PostRevokeTokenRequest request, CancellationToken cancellationToken)
    {
        var command = new PostRevokeTokenCommand(request);
        await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Подтверждение почты
    /// </summary>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если пользователь ввёл неверный код подтверждение</response>
    [HttpPost("ConfirmEmail")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task ConfirmEmail([FromBody] PostConfirmEmailRequest request,
        CancellationToken cancellationToken)
    {
        var command = new PostConfirmEmailCommand(request);
        await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Валидация токена подтверждения сброса пароля
    /// </summary>
    /// <param name="request">PostValidatePasswordResetConfirmationTokenRequest(VerificationCodeFromUser)</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если пользователь ввёл неверный код подтверждение</response>
    [HttpPost("ValidatePasswordResetConfirmationToken")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task ValidatePasswordResetConfirmationToken(
        [FromBody] PostValidatePasswordResetConfirmationTokenRequest request,
        CancellationToken cancellationToken)
    {
        var command = new PostValidatePasswordResetConfirmationTokenCommand(request);
        await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Подтверждение сброса пароля
    /// </summary>
    /// <param name="request">PostConfirmPasswordResetRequest</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="400">Если пришёл неверный код подтверждение, или пароли не совпадают,
    /// или текщий пароль равен новому</response>
    [HttpPost("ConfirmPasswordReset")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task ConfirmPasswordReset([FromBody] PostConfirmPasswordResetRequest request,
        CancellationToken cancellationToken)
    {
        var command = new PostConfirmPasswordResetCommand(request);
        await _mediator.Send(command, cancellationToken);
    }
}