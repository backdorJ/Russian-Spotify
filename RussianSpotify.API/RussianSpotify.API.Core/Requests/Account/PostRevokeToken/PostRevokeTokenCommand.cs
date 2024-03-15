using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostRevokeToken;

namespace RussianSpotify.API.Core.Requests.Account.PostRevokeToken;

/// <summary>
/// Команда для обнуления Refresh токена
/// </summary>
public class PostRevokeTokenCommand : PostRevokeTokenRequest, IRequest
{
    public PostRevokeTokenCommand(PostRevokeTokenRequest request) : base(request)
    {
    }

    public PostRevokeTokenCommand()
    {
    }
}