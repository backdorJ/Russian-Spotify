using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.Contracts.Requests.Account.PostResetPassword;

namespace RussianSpotify.API.Core.Requests.Account.PostResetPassword;

/// <summary>
/// Обработчик для <see cref="PostResetPasswordCommand"/>
/// </summary>
public class PostResetPasswordCommandHandler :
    IRequestHandler<PostResetPasswordCommand, PostResetPasswordResponse>
{
    private readonly UserManager<User> _userManager;

    private readonly IEmailSender _emailSender;
    
    public PostResetPasswordCommandHandler(UserManager<User> userManager, IEmailSender emailSender)
        => (_userManager, _emailSender) = (userManager, emailSender);


    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<PostResetPasswordResponse> Handle(PostResetPasswordCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
            throw new NotFoundUserException(AuthErrorMessages.UserNotFound);
        
        var isEqualsOldAndNewPasswords = await _userManager.CheckPasswordAsync(user, request.NewPassword);

        if (isEqualsOldAndNewPasswords)
            throw new EqualsOldAndNewPasswordsException(AuthErrorMessages.EqualsOldAndNewPasswords);

        var passwordResetVerificationCode =  await _userManager.GeneratePasswordResetTokenAsync(user);

        await _emailSender.SendEmailAsync(request.Email,
            EmailMessages.ConfirmPasswordResetMessage(passwordResetVerificationCode), cancellationToken);

        return new PostResetPasswordResponse { Email = request.Email, NewPassword = request.NewPassword };
    }
}