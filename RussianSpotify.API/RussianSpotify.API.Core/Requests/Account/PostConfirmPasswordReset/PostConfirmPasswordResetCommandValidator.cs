using FluentValidation;
using RussianSpotify.API.Core.Enums;

namespace RussianSpotify.API.Core.Requests.Account.PostConfirmPasswordReset;

/// <summary>
/// Валидатор для <see cref="PostConfirmPasswordResetCommand"/>
/// </summary>
public class PostConfirmPasswordResetCommandValidator :
    AbstractValidator<PostConfirmPasswordResetCommand>
{
    public PostConfirmPasswordResetCommandValidator()
    {
        RuleFor(command => command.Email)
            .NotEmpty().WithMessage(AuthErrorMessages.EmptyField("Email"));

        RuleFor(command => command.Email)
            .EmailAddress().WithMessage(AuthErrorMessages.InvalidEmailFormat);

        RuleFor(command => command.NewPassword)
            .NotEmpty().WithMessage(AuthErrorMessages.EmptyField("New Password"));

        RuleFor(command => command.VerificationCodeFromUser)
            .NotEmpty().WithMessage(AuthErrorMessages.EmptyField("Verification Code From User"));
    }
}