using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Subscription.GetSubscription;
using RussianSpotify.API.Core.Requests.Subscription.PostSubscribe;
using RussianSpotify.API.Core.Requests.Subscription.PostUnsubscribe;
using RussianSpotify.Contracts.Requests.Subscription.GetSubscription;
using RussianSpotify.Contracts.Requests.Subscription.PostSubscribe;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер, отвечающий за Подписки пользователей
/// </summary>
[Authorize]
[Route("api/[controller]/[action]")]
public class SubscriptionController : ControllerBase
{
    private readonly IMediator _mediator;

    public SubscriptionController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Эндпоинт, отвечающий за подписку пользователя
    /// </summary>
    /// <param name="request"><see cref="PostSubscribeRequest"/>, содержащий информацию о запросе</param>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpPost]
    public async Task SubscribeAsync(PostSubscribeRequest request, CancellationToken cancellationToken)
    {
        var postSubscribeCommand = new PostSubscribeCommand(request);
        await _mediator.Send(postSubscribeCommand, cancellationToken);
    }

    /// <summary>
    /// Эндпоинт, отвечающий за отмену подписки
    /// </summary>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpPatch]
    public async Task UnsubscribeAsync(CancellationToken cancellationToken)
    {
        var postUnsubscribeCommand = new PostUnsubscribeCommand();
        await _mediator.Send(postUnsubscribeCommand, cancellationToken);
    }

    /// <summary>
    /// Эндпоинт, отвечающий за получение информации о подписке пользователя
    /// </summary>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns><see cref="GetSubscriptionResponse"/>, содержащий информацию о подписке пользователя</returns>
    [HttpGet]
    public async Task<GetSubscriptionResponse> GetInfoAsync(CancellationToken cancellationToken)
    {
        var getSubscriptionQuery = new GetSubscriptionQuery();
        return await _mediator.Send(getSubscriptionQuery, cancellationToken);
    }
}