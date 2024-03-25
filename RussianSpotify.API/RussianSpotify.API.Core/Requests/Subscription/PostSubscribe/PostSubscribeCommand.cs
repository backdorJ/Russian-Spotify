using MediatR;
using RussianSpotify.Contracts.Requests.Subscription.PostSubscribe;

namespace RussianSpotify.API.Core.Requests.Subscription.PostSubscribe;

/// <summary>
/// Команда для оформления подписки
/// </summary>
public class PostSubscribeCommand : PostSubscribeRequest, IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request"><see cref="PostSubscribeRequest"/>, содержащий информацию о команде</param>
    public PostSubscribeCommand(PostSubscribeRequest request) : base(request)
    {
    }
}