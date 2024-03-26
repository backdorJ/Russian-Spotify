using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.Contracts.Requests.Account.PatchUpdateUserInfo;

namespace RussianSpotify.API.Core.Requests.Account.PatchUpdateUserInfo;

public class PatchUpdateUserInfoCommandHandler : IRequestHandler<PatchUpdateUserInfoCommand, PatchUpdateUserInfoResponse>
{
    private readonly UserManager<User> _userManager;

    private readonly IUserContext _userContext;

    private readonly IUserClaimsManager _claimsManager;

    private readonly IJwtGenerator _jwtGenerator;

    private readonly IEmailSender _emailSender;

    public PatchUpdateUserInfoCommandHandler(UserManager<User> userManager, IUserContext userContext, IUserClaimsManager claimsManager, IJwtGenerator jwtGenerator, IEmailSender emailSender)
    {
        _userManager = userManager;
        _userContext = userContext;
        _claimsManager = claimsManager;
        _jwtGenerator = jwtGenerator;
        _emailSender = emailSender;
    }

    public async Task<PatchUpdateUserInfoResponse> Handle(PatchUpdateUserInfoCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var userId = _userContext.CurrentUserId;
        
        if (userId is null)
            throw new CurrentUserIdNotFound("User Id was not found");

        var user = await _userManager.FindByIdAsync(userId.ToString()!);

        if (user is null)
            throw new NotFoundUserException($"User with id: {userId}");

        user.UserName ??= request.UserName;
        var changePasswordResult = IdentityResult.Success;
        
        if (!string.IsNullOrWhiteSpace(request.NewPassword))
        {
            if (!string.IsNullOrWhiteSpace(request.NewPasswordConfirm) 
                && !string.IsNullOrWhiteSpace(request.CurrentPassword) 
                && request.NewPasswordConfirm!.Equals(request.NewPassword, StringComparison.Ordinal))
                
                changePasswordResult = 
                    await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
        }

        if (!changePasswordResult.Succeeded)
            throw new InvalidChangePasswordException(string.Join("\n",
                changePasswordResult.Errors.Select(x => x.Description)));

        var claims = await _claimsManager.GetUserClaimsAsync(user, cancellationToken);

        user.AccessToken = _jwtGenerator.GenerateToken(claims);
        user.RefreshToken = _jwtGenerator.GenerateRefreshToken();
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(TokenConfiguration.RefreshTokenExpiryDays);
        
        // TODO: настроить RussianSpotify.API.Core/Models/EmailTemplateHelper, чтобы он генерил сообщение
        await _userManager.UpdateAsync(user);
        await _emailSender.SendEmailAsync(user.Email!, "", cancellationToken);

        return new PatchUpdateUserInfoResponse { AccessToken = user.AccessToken, RefreshToken = user.RefreshToken };
    }
}