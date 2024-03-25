using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions.SubscriptionExceptions;

namespace RussianSpotify.API.Core.Requests.Subscription.PostSubscribe;

/// <summary>
/// Обработчик для <see cref="PostSubscribeCommand"/>
/// </summary>
public class PostSubscribeCommandHandler : IRequestHandler<PostSubscribeCommand>
{
    private readonly ISubscriptionHandler _subscriptionHandler;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="subscriptionHandler">Сервис для управления подписками</param>
    /// <param name="userContext">Контекст текущего пользователя</param>
    public PostSubscribeCommandHandler(ISubscriptionHandler subscriptionHandler, IUserContext userContext)
    {
        _subscriptionHandler = subscriptionHandler;
        _userContext = userContext;
    }

    /// <inheritdoc/>
    public async Task Handle(PostSubscribeCommand request, CancellationToken cancellationToken)
    {
        var userId = _userContext.CurrentUserId;

        if (userId is null)
            throw new SubscriptionInternalException("User not found");

        var result = await _subscriptionHandler.Subscribe(userId.Value, request.SubscriptionLength);

        if (!result)
            throw new SubscriptionInternalException("Internal error");
    }
}