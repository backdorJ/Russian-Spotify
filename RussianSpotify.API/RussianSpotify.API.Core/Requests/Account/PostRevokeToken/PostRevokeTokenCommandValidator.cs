using FluentValidation;
using RussianSpotify.API.Core.Enums;

namespace RussianSpotify.API.Core.Requests.Account.PostRevokeToken;

/// <summary>
/// Валидатор для <see cref="PostRevokeTokenCommand"/>
/// </summary>
public class PostRevokeTokenCommandValidator : AbstractValidator<PostRevokeTokenCommand>
{
    public PostRevokeTokenCommandValidator()
    {
        RuleFor(command => command.Email)
            .NotEmpty().WithMessage(AuthErrorMessages.EmptyField("Email"));

        RuleFor(command => command.Email)
            .EmailAddress().WithMessage(AuthErrorMessages.InvalidEmailFormat);
    }
}