using System.Globalization;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.AuthExceptions;

namespace RussianSpotify.API.Core.Requests.Auth.PostValidatePasswordResetConfirmationToken;

/// <summary>
/// Обработчик для <see cref="PostValidatePasswordResetConfirmationTokenCommand"/>
/// </summary>
public class PostValidatePasswordResetConfirmationTokenCommandHandler
    : IRequestHandler<PostValidatePasswordResetConfirmationTokenCommand>
{
    private readonly IDistributedCache _cache;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="cache">Кэш</param>
    public PostValidatePasswordResetConfirmationTokenCommandHandler(IDistributedCache cache)
    {
        _cache = cache;
    }

    public async Task Handle(PostValidatePasswordResetConfirmationTokenCommand request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var expiryTimeString = await _cache.GetStringAsync(request.VerificationCodeFromUser, cancellationToken);

        if (expiryTimeString is null)
            throw new WrongConfirmationTokenException(AuthErrorMessages.WrongConfirmationToken);

        DateTime.TryParseExact(expiryTimeString, "G",
            CultureInfo.InvariantCulture, DateTimeStyles.None, out var expiryTime);

        if (DateTime.UtcNow > expiryTime)
            throw new BadRequestException("Время жизни токена истекло");
    }
}