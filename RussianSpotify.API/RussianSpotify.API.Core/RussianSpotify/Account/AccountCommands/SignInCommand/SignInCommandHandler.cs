using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace RussianSpotify.API.Core.RussianSpotify.Account.AccountCommands.SignInCommand;

public class SignInCommandHandler : IRequestHandler<SignInCommand, AccountCommandResult>
{
    private readonly UserManager<User> _userManager;

    private readonly SignInManager<User> _signInManager;

    private readonly IJwtGenerator _jwtGenerator;

    public SignInCommandHandler(UserManager<User> userManager, IJwtGenerator jwtGenerator, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _jwtGenerator = jwtGenerator;
        _signInManager = signInManager;
    }

    public async Task<AccountCommandResult> Handle(SignInCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.UserName);
        var errorResult = new AccountCommandResult { IsSuccessfull = false, StatusCode = HttpStatusCode.Unauthorized};


        if (user is null)
        {
            errorResult.ErrorMessages.Add(AuthErrorMessages.UserNotFound);
            return errorResult;
        }

        var signInResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (!signInResult.Succeeded)
        {
            errorResult.ErrorMessages.Add(AuthErrorMessages.WrongPassword);
            return errorResult;
        }

        await _signInManager.SignInAsync(user, isPersistent: false, "Bearer Token");
        
        var userRoles = await _userManager.GetRolesAsync(user);

        var authClaims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName!),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        foreach (var role in userRoles) 
            authClaims.Add(new Claim(ClaimTypes.Role, role));

        var jwt = _jwtGenerator.GenerateToken(authClaims);

        return new AccountCommandResult
        {
            IsSuccessfull = true,
            StatusCode = HttpStatusCode.OK,
            Token = new JwtSecurityTokenHandler().WriteToken(jwt)
        };
    }
}