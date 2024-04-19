using FluentValidation;
using RussianSpotify.API.Core.Enums;

namespace RussianSpotify.API.Core.Requests.Auth.PostResetPassword;

/// <summary>
/// Валидатор для <see cref="PostResetPasswordCommand"/>
/// </summary>
public class PostResetPasswordCommandValidator : AbstractValidator<PostResetPasswordCommand>
{
    public PostResetPasswordCommandValidator()
    {
        RuleFor(command => command.Email)
            .NotEmpty().WithMessage(AuthErrorMessages.EmptyField("Email"));

        RuleFor(command => command.Email)
            .EmailAddress().WithMessage(AuthErrorMessages.InvalidEmailFormat);
    }
}