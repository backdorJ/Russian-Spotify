using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Exceptions.OAuthAccountExceptions;
using RussianSpotify.API.Core.Extensions;
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
    private readonly UserManager<User> _userManager;
    
    private readonly SignInManager<User> _signInManager;

    private readonly IJwtGenerator _jwtGenerator;
    
    /// <inheritdoc cref="ControllerBase"/>
    public OAuthAccountController(SignInManager<User> signInManager, UserManager<User> userManager, IJwtGenerator jwtGenerator)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _jwtGenerator = jwtGenerator;
    }

    /// <summary>
    /// Редирект пользователя на логин страницу стороннего сервиса
    /// </summary>
    /// <param name="provider">Имя провайдера(Vkontakte, Yandex, Google)</param>
    /// <returns>Challenge Result</returns>
    /// <response code="200">Если всё хорошо</response>
    /// <response code="500">Если не удалось залогиниться через стороннего провайдера</response>
    [HttpGet("ExternalLogin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult ExternalLogin([FromQuery] string provider)
    {
        var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "OAuthAccount");
        var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
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
        var info = await _signInManager.GetExternalLoginInfoAsync();
        
        if (info is null)
            throw new ExternalLoginInfoNotFoundException(AuthErrorMessages.ExternalLoginInfoNotFound);

        var claims = info.Principal.Claims.ToList();
        
        var jwt = _jwtGenerator.GenerateToken(claims);
        var refreshToken = _jwtGenerator.GenerateRefreshToken();

        var email = claims.GetClaimValueOf(ClaimTypes.Email);
        if (email is null)
            throw new EmailClaimNotFoundException(AuthErrorMessages.EmailClaimNotFound);

        var user = await _userManager.FindByEmailAsync(email);
        
        if (user is null)
        {
            user = new User
            {
                UserName = claims.GetClaimValueOf(ClaimTypes.Name) ??
                           $"{claims.GetClaimValueOf(ClaimTypes.GivenName)}" +
                           $" {claims.GetClaimValueOf(ClaimTypes.Surname)}", 
                Email = email
            };

            var createUserResult = await _userManager.CreateAsync(user);

            if (!createUserResult.Succeeded)
                throw new RegisterUserException(string.Join("\n",
                    createUserResult.Errors.Select(error => error.Description)));
            
            await _userManager.AddToRoleAsync(user, BaseRoles.UserRoleName);
        }

        user.AccessToken = jwt;
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(TokenConfiguration.RefreshTokenExpiryDays);

        await _userManager.UpdateAsync(user);
        
        return new GetExternalLoginCallbackResponse
            { AccessToken = jwt, RefreshToken = refreshToken };
    }
}