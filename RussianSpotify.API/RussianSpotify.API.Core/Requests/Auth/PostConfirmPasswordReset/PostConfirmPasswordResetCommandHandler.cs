using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;

namespace RussianSpotify.API.Core.Requests.Auth.PostConfirmPasswordReset;

/// <summary>
/// Обработчик для <see cref="PostConfirmPasswordResetCommand"/>
/// </summary>
public class PostConfirmPasswordResetCommandHandler : IRequestHandler<PostConfirmPasswordResetCommand>
{
    private readonly UserManager<User> _userManager;

    public PostConfirmPasswordResetCommandHandler(UserManager<User> userManager)
        => _userManager = userManager;

    /// <inheritdoc cref="IRequestHandler{TRequest, TResponse}"/>
    public async Task Handle(PostConfirmPasswordResetCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
            throw new NotFoundUserException(AuthErrorMessages.UserNotFound);

        var passwordResetResult = await _userManager.ResetPasswordAsync(user,
            request.VerificationCodeFromUser, request.NewPassword);

        if (!passwordResetResult.Succeeded)
            throw new BadRequestException(string.Join("\n", passwordResetResult.Errors));

        user.SecurityStamp = _userManager.GenerateNewAuthenticatorKey();
        user.RefreshToken = null;

        await _userManager.UpdateAsync(user);
    }
}