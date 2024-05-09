using FluentValidation;
using RussianSpotify.API.Core.Enums;

namespace RussianSpotify.API.Core.Requests.Auth.PostConfirmEmail;

/// <summary>
/// Валидатор для <see cref="PostConfirmEmailCommand"/>
/// </summary>
public class PostConfirmEmailCommandValidator :
    AbstractValidator<PostConfirmEmailCommand>
{
    public PostConfirmEmailCommandValidator()
    {
        RuleFor(command => command)
            .NotEmpty().WithMessage(AuthErrorMessages.EmptyField("Email"));

        RuleFor(command => command.Email)
            .EmailAddress().WithMessage(AuthErrorMessages.InvalidEmailFormat);

        RuleFor(command => command.EmailVerificationCodeFromUser)
            .NotEmpty().WithMessage(AuthErrorMessages.EmptyField("Action Verification Code"));
    }
}