using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.API.Core.Models;
using RussianSpotify.API.Core.Requests.Account.PostLogin;
using RussianSpotify.Contracts.Requests.Account.PostLogin;

namespace RussianSpotify.API.Core.Requests.Auth.PostLogin;

/// <summary>
/// Обработчик для <see cref="PostLoginCommand"/>
/// </summary>
public class PostLoginCommandHandler : IRequestHandler<PostLoginCommand, PostLoginResponse>
{
    private readonly UserManager<User> _userManager;

    private readonly IJwtGenerator _jwtGenerator;

    private readonly IUserClaimsManager _claimsManager;

    private readonly IEmailSender _emailSender;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="userManager">UserManager{User} из Identity</param>
    /// <param name="jwtGenerator">Генератор JWT</param>
    /// <param name="claimsManager">ClaimsManager <see cref="IUserClaimsManager"/> </param>
    /// <param name="emailSender">EmailSender <see cref="IEmailSender"/> </param>
    public PostLoginCommandHandler(UserManager<User> userManager,
        IJwtGenerator jwtGenerator, IUserClaimsManager claimsManager, IEmailSender emailSender)
    {
        _userManager = userManager;
        _jwtGenerator = jwtGenerator;
        _claimsManager = claimsManager;
        _emailSender = emailSender;
    }

    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<PostLoginResponse> Handle(PostLoginCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
            throw new NotFoundUserException(AuthErrorMessages.UserNotFound);

        if (!user.EmailConfirmed)
        {
            var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var messageTemplate =
                await EmailTemplateHelper.GetEmailTemplateAsync(Templates.SendEmailConfirmationMessage,
                    cancellationToken);

            var placeholders = new Dictionary<string, string> { ["{confirmationToken}"] = confirmationToken };

            var message = messageTemplate.ReplacePlaceholders(placeholders);

            await _emailSender.SendEmailAsync(user.Email!,
                message, cancellationToken);

            throw new NotConfirmedEmailException(AuthErrorMessages.NotConfirmedEmail);
        }

        var isCorrectPassword = await _userManager.CheckPasswordAsync(user, request.Password);

        if (!isCorrectPassword)
            throw new WrongPasswordException(AuthErrorMessages.WrongPassword);

        var userClaims = await _claimsManager.GetUserClaimsAsync(user, cancellationToken);

        user.AccessToken = _jwtGenerator.GenerateToken(userClaims);
        user.RefreshToken = _jwtGenerator.GenerateRefreshToken();
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(TokenConfiguration.RefreshTokenExpiryDays);

        await _userManager.UpdateAsync(user);

        return new PostLoginResponse { AccessToken = user.AccessToken, RefreshToken = user.RefreshToken };
    }
}