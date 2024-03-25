using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;

namespace RussianSpotify.API.Core.Requests.Account.PostConfirmEmail;

/// <summary>
/// Обработчик для <see cref="PostConfirmEmailCommand"/>
/// </summary>
public class PostConfirmEmailCommandHandler :
    IRequestHandler<PostConfirmEmailCommand>
{
    private readonly UserManager<User> _userManager;

    public PostConfirmEmailCommandHandler(UserManager<User> userManager)
        => _userManager = userManager;

    /// <inheritdoc cref="IRequestHandler{TRequest}"/>
    public async Task Handle(PostConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
            throw new NotFoundUserException(AuthErrorMessages.UserNotFound);

        var verificationResult =
            await _userManager.ConfirmEmailAsync(user, request.EmailVerificationCodeFromUser);

        if (!verificationResult.Succeeded)
            throw new WrongConfirmationTokenException(AuthErrorMessages.WrongConfirmationToken);

        user.EmailConfirmed = true;

        await _userManager.UpdateAsync(user);
    }
}