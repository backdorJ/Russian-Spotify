using FluentValidation;
using RussianSpotify.API.Core.Enums;

namespace RussianSpotify.API.Core.Requests.Account.PostLogin;

/// <summary>
/// Валидатор для <see cref="PostLoginCommand"/>
/// </summary>
public class PostLoginCommandValidator : AbstractValidator<PostLoginCommand>
{
    public PostLoginCommandValidator()
    {
        RuleFor(command => command.Email)
            .NotEmpty().WithMessage(AuthErrorMessages.EmptyField("Email"));

        RuleFor(command => command.Email)
            .EmailAddress().WithMessage(AuthErrorMessages.InvalidEmailFormat);
        
        RuleFor(command => command.Password)
            .NotEmpty().WithMessage(AuthErrorMessages.EmptyField("Password"));
    }
}