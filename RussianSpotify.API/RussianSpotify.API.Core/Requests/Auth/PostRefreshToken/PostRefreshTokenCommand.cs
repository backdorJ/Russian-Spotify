using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostRefreshToken;

namespace RussianSpotify.API.Core.Requests.Account.PostRefreshToken;

/// <summary>
/// Команда для обновления JWT токена
/// </summary>
public class PostRefreshTokenCommand : PostRefreshTokenRequest, IRequest<PostRefreshTokenResponse>
{
    public PostRefreshTokenCommand(PostRefreshTokenRequest request) : base(request)
    {
    }

    public PostRefreshTokenCommand()
    {
    }
}