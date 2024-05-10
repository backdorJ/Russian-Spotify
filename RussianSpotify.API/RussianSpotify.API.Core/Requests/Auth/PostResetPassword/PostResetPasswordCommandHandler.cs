using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.API.Core.Models;
using RussianSpotify.Contracts.Requests.Auth.PostResetPassword;

namespace RussianSpotify.API.Core.Requests.Auth.PostResetPassword;

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
    public async Task<PostResetPasswordResponse> Handle(PostResetPasswordCommand request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
            throw new NotFoundUserException(AuthErrorMessages.UserNotFound);

        var confirmationToken = await _userManager.GeneratePasswordResetTokenAsync(user);

        var messageTemplate =
            await EmailTemplateHelper.GetEmailTemplateAsync(Templates.SendPasswordResetConfirmationMessage,
                cancellationToken);

        var placeholders = new Dictionary<string, string> { ["{confirmationToken}"] = confirmationToken };

        var message = messageTemplate.ReplacePlaceholders(placeholders);

        await _emailSender.SendEmailAsync(request.Email, message, cancellationToken);

        return new PostResetPasswordResponse { Email = request.Email };
    }
}