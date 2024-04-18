using FluentValidation;
using RussianSpotify.API.Core.Enums;

namespace RussianSpotify.API.Core.Requests.Auth.PostConfirmPasswordReset;

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

        RuleFor(command => command.NewPassword).MinimumLength(8)
            .WithMessage(AuthErrorMessages.ShortPassword(8));

        RuleFor(command => command.NewPasswordConfirm)
            .NotEmpty().WithMessage(AuthErrorMessages.EmptyField("Password Confirm"));

        RuleFor(command => command.NewPassword)
            .Equal(command => command.NewPasswordConfirm).WithMessage(AuthErrorMessages.PasswordIsNotConfirmed);
    }
}