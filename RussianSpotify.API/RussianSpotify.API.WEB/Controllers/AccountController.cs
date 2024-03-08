using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.WEB.Models.Dtos;
using RussianSpotify.API.WEB.Models.ViewModels;

namespace RussianSpotify.API.WEB.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]/[action]")]
public class AccountController : ControllerBase
{
    private readonly SignInManager<User> _signInManager;

    private readonly UserManager<User> _userManager;

    public AccountController(SignInManager<User> signInManager, UserManager<User> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }


    [HttpPost]
    public async Task<ActionResult<AuthResultDto>> Login([FromBody] LoginViewModel model)
    {
        var result = await _signInManager.PasswordSignInAsync(model.Login, model.Password, model.RememberMe, false);

        if (!result.Succeeded)
            return BadRequest(
                new AuthResultDto
                {
                    IsSuccessfull = false, StatusCode = HttpStatusCode.BadRequest,
                    MessageOnError = "Wrong login or password", ReturnUrl = model.ReturnUrl
                }
            );

        var user = await _userManager.FindByNameAsync(model.Login);
        var token = await _userManager.CreateSecurityTokenAsync(user);

        return Ok(
            new AuthResultDto
            {
                IsSuccessfull = true,
                Token = token,
                ReturnUrl = model.ReturnUrl,
                StatusCode = HttpStatusCode.Redirect
            }
        );
    }

    [HttpPost]
    public async Task<ActionResult<AuthResultDto>> Register([FromBody] RegisterViewModel model)
    {
        if(model.Password != model.PasswordConfirm)
            return BadRequest(
                new AuthResultDto
                {
                    IsSuccessfull = false, StatusCode = HttpStatusCode.BadRequest,
                    MessageOnError = "Passwords != PasswordConfirmation", ReturnUrl = model.ReturnUrl
                }
            );
        
        var user = new User { Email = model.Email, UserName = model.Login};
        var registerResult = await _userManager.CreateAsync(user, model.Password);
        
        if(!registerResult.Succeeded)
            return BadRequest(
            new AuthResultDto
            {
                IsSuccessfull = false, StatusCode = HttpStatusCode.BadRequest,
                MessageOnError = registerResult.Errors.First().Description, ReturnUrl = model.ReturnUrl
            }
        );

        user = await _userManager.FindByNameAsync(model.Login);
        var token = await _userManager.CreateSecurityTokenAsync(user);

        return Ok(
            new AuthResultDto
            {
                IsSuccessfull = true, StatusCode = HttpStatusCode.Redirect, 
                ReturnUrl = model.ReturnUrl, Token = token
            }
        );
    }

}