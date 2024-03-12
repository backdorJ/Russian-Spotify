using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostRevokeToken;

namespace RussianSpotify.API.Core.Requests.Account.PostRevokeToken;

public class PostRevokeTokenCommand : PostRevokeTokenRequest, IRequest
{
    public PostRevokeTokenCommand(PostRevokeTokenRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        Email = request.Email;
    }

    public PostRevokeTokenCommand()
    {
    }
}