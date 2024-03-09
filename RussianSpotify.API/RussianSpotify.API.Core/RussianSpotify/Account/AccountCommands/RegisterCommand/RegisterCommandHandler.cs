using System.Net;
using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.RussianSpotify.Account.AccountCommands.RegisterCommand;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AccountCommandResult>
{
    private readonly UserManager<User> _userManager;

    private readonly RoleManager<Role> _roleManager;

    public RegisterCommandHandler(UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<AccountCommandResult> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var userWithSameName = await _userManager.FindByNameAsync(request.UserName);
        var errorResult = new AccountCommandResult { IsSuccessfull = false, StatusCode = HttpStatusCode.BadRequest };

        if (userWithSameName is not null)
        {
            errorResult.ErrorMessages.Add( AuthErrorMessages.UserWithSameName);
            return errorResult;
        }
        
        var userWithSameEmail = await _userManager.FindByEmailAsync(request.Email);
        if (userWithSameEmail is not null)
        {
            errorResult.ErrorMessages.Add( AuthErrorMessages.UserWithSameEmail);
            return errorResult;
        }

        var user = new User
        {
            Login = request.UserName,
            UserName = request.UserName,
            Email = request.Email,
            SecurityStamp = Guid.NewGuid().ToString()
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            errorResult.ErrorMessages = result.Errors.Select(error => error.Description).ToList();
            return errorResult;
        }

        await _userManager.AddToRoleAsync(user, BaseRoles.UserRoleName);

        return new AccountCommandResult
        {
            IsSuccessfull = true,
            StatusCode = HttpStatusCode.Redirect
        };
    }
}