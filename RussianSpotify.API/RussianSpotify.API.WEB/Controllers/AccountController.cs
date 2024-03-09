using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.RussianSpotify.Account.AccountCommands;
using RussianSpotify.API.Core.RussianSpotify.Account.AccountCommands.RegisterCommand;
using RussianSpotify.API.Core.RussianSpotify.Account.AccountCommands.SignInCommand;
using RussianSpotify.API.WEB.Models.Dtos;
using RussianSpotify.API.WEB.Models.ViewModels;

namespace RussianSpotify.API.WEB.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AccountController : ControllerBase
{
    private readonly IMediator _mediator;

    public AccountController(IMediator mediator) => _mediator = mediator;

    [HttpPost]
    public async Task<ActionResult<AuthResultDto>> Login([FromBody] LoginViewModel model, CancellationToken cancellationToken)
    {
        var command = new SignInCommand()
        {
            UserName = model.UserName,
            Password = model.Password,
        };

        var signInResult = await _mediator.Send(command, cancellationToken);

        var authResultDto = new AuthResultDto
        {
            IsSuccessfull = signInResult.IsSuccessfull,
            ErrorMessages = signInResult.ErrorMessages,
            Token = signInResult.Token,
            ReturnUrl = model.ReturnUrl ?? string.Empty
        };
        
        return StatusCode((int)signInResult.StatusCode, authResultDto);
    }

    [HttpPost]
    public async Task<ActionResult<AccountCommandResult>> Register([FromBody] RegisterViewModel model)
    {
        var command = new RegisterCommand
        {
            UserName = model.UserName,
            Email = model.Email,
            Password = model.Password,
            PasswordConfirm = model.PasswordConfirm
        };

        var registerResult = await _mediator.Send(command);
        var authResultDto = new AuthResultDto
        {
            IsSuccessfull = registerResult.IsSuccessfull,
            ErrorMessages = registerResult.ErrorMessages,
            ReturnUrl = model.ReturnUrl ?? string.Empty
        };

        return StatusCode((int)registerResult.StatusCode, authResultDto);
    }

    [Authorize]
    [HttpGet]
    public string Test() => "Test";
}