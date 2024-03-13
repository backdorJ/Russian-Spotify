using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Exceptions.OAuthAccountExceptions;
using RussianSpotify.Contracts.Requests.Account.PostLogin;
using RussianSpotify.Contracts.Requests.OAuthAccount;
using RussianSpotify.Contracts.Requests.OAuthAccount.RegisterExternalConfirmed;

namespace RussianSpotify.API.WEB.Controllers;

[ApiController]
[Route("api/[controller]/")]
[AllowAnonymous]
public class OAuthAccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    
    private readonly SignInManager<User> _signInManager;

    private readonly IJwtGenerator _jwtGenerator;
    
    public OAuthAccountController(SignInManager<User> signInManager, UserManager<User> userManager, IJwtGenerator jwtGenerator)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _jwtGenerator = jwtGenerator;
    }

    [HttpGet("ExternalLogin")]
    public IActionResult ExternalLogin([FromQuery] string provider)
    {
        var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "OAuthAccount");
         var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
         return Challenge(properties, provider);
    }

    [HttpGet("ExternalLoginCallback")]
    public async Task<GetExternalLoginCallbackResponse> ExternalLoginCallback()
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        
        if (info is null)
            throw new ApplicationBaseException("Can not authorize(info null)", HttpStatusCode.InternalServerError);
        
        var jwt = _jwtGenerator.GenerateToken(info.Principal.Claims.ToList());
        var refreshToken = _jwtGenerator.GenerateRefreshToken();

        var email = info.Principal.Claims.FirstOrDefault(claim => claim.Type is ClaimTypes.Email)?.Value;
        if (email is null)
            throw new EmailClaimNotFoundException(AuthErrorMessages.EmailClaimNotFound);

        var user = await _userManager.FindByEmailAsync(email);

        var isRegistered = user is not null;

        if (!isRegistered)
            return new GetExternalLoginCallbackResponse
                { AccessToken = jwt, RefreshToken = refreshToken, IsRegistered = isRegistered };

        user!.AccessToken = jwt;
        user.RefreshToken = refreshToken;

        await _userManager.UpdateAsync(user);

        return new GetExternalLoginCallbackResponse
            { AccessToken = jwt, RefreshToken = refreshToken, IsRegistered = isRegistered };
    }
    
    [Authorize]
    [HttpPost("RegisterExternalConfirmed")]
    public async Task<RegisterExternalConfirmedResponse> 
        RegisterExternalConfirmed(RegisterExternalConfirmedRequest request)
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        
        if (info is null)
            throw new ApplicationBaseException("Can not authorize", HttpStatusCode.InternalServerError);

        var email = info.Principal.Claims.First(claim => claim.Type is ClaimTypes.Email).Value;

        var jwt = _jwtGenerator.GenerateToken(info.Principal.Claims.ToList());
        var refreshToken = _jwtGenerator.GenerateRefreshToken();
        
        var user = 
            new User { UserName = request.UserName, Email = email,
                AccessToken = jwt, RefreshToken = refreshToken, EmailConfirmed = true};

        var result = await _userManager.CreateAsync(user);
        await _userManager.AddToRoleAsync(user, "Пользователь");

        if (!result.Succeeded)
            throw new RegisterUserException();

        return new RegisterExternalConfirmedResponse { AccessToken = jwt, RefreshToken = refreshToken };
    }
}