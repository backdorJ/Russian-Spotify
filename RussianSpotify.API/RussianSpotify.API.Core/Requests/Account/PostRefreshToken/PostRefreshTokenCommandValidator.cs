using FluentValidation;

namespace RussianSpotify.API.Core.Requests.Account.PostRefreshToken;

public class PostRefreshTokenCommandValidator : AbstractValidator<PostRefreshTokenCommand>
{
    public PostRefreshTokenCommandValidator()
    {
        RuleFor(command => command.AccessToken).NotEmpty();
        RuleFor(command => command.RefreshToken).NotEmpty();
    }
}