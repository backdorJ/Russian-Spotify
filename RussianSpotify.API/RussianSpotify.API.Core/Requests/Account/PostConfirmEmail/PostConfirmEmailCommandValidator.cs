using FluentValidation;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Requests.Account.PostConfirmEmail;

namespace RussianSpotify.API.Core.Requests.Account.PostConfirmActionViaEmail;

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