using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AuthExceptions;

namespace RussianSpotify.API.Core.Requests.Auth.PostRevokeToken;

/// <summary>
/// Обработчик для <see cref="PostRevokeTokenCommand"/>
/// </summary>
public class PostRevokeTokenCommandHandler : IRequestHandler<PostRevokeTokenCommand>
{
    private readonly UserManager<User> _userManager;

    public PostRevokeTokenCommandHandler(UserManager<User> userManager)
        => _userManager = userManager;

    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task Handle(PostRevokeTokenCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
            throw new NotFoundUserException(AuthErrorMessages.UserNotFound);

        user.RefreshToken = null;
        await _userManager.UpdateAsync(user);
    }
}