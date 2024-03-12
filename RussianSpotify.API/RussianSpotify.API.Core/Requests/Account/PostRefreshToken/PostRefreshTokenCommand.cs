using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostRefreshToken;

namespace RussianSpotify.API.Core.Requests.Account.PostRefreshToken;

public class PostRefreshTokenCommand : PostRefreshTokenRequest, IRequest<PostRefreshTokenResponse>
{
    public PostRefreshTokenCommand(PostRefreshTokenRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        AccessToken = request.AccessToken;
        RefreshToken = RefreshToken;
    }

    public PostRefreshTokenCommand()
    {
    }
}