using System.Data;
using FluentValidation;

namespace RussianSpotify.API.Core.RussianSpotify.Account.AccountCommands.RegisterCommand;

public class RegisterCommandValidator: AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(registerCommand => registerCommand.Password)
            .Equal(registerCommand => registerCommand.PasswordConfirm)
            .WithMessage(AuthErrorMessages.PasswordIsNotConfirmed);
    }
}