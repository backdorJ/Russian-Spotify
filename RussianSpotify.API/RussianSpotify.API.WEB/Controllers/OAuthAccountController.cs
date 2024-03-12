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
using RussianSpotify.Contracts.Requests.Account.PostLogin;

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
    public IActionResult ExternalLogin(string provider, string? returnUrl = null)
    {
        var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "OAuthAccount", new { returnUrl });
         var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
         return Challenge(properties, provider);
    }

    [HttpGet("ExternalLoginCallback")]
    public async Task<PostLoginResponse> ExternalLoginCallback(string? returnUrl)
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        
        if (info is null)
            throw new ApplicationBaseException("Can not authorize(info null)", HttpStatusCode.InternalServerError);
        
        var jwt = _jwtGenerator.GenerateToken(info.Principal.Claims.ToList());
        var refreshToken = _jwtGenerator.GenerateRefreshToken();

        var haha = info.Principal.Claims.Select(x => x.Value).ToList();
        return new PostLoginResponse { Token = jwt, RefreshToken = refreshToken };
    }
    
    [HttpGet("RegisterExternalConfirmed")]
    public async Task<string> RegisterExternalConfirmed(string userName, string returnUrl)
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        
        if (info is null)
            throw new ApplicationBaseException("Can not authorize", HttpStatusCode.InternalServerError);

        var email = info.Principal.Claims.First(claim => claim.Type is ClaimTypes.Email).Value;

        var user = new User { UserName = userName, Email = email };

        var result = await _userManager.CreateAsync(user);
        await _userManager.AddToRoleAsync(user, "Пользователь");

        if (!result.Succeeded)
            throw new RegisterUserException(); 
        
        return returnUrl;
    }
}