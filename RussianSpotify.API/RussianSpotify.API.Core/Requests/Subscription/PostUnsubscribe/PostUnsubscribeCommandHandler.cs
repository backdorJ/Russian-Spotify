using MediatR;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.SubscriptionExceptions;

namespace RussianSpotify.API.Core.Requests.Subscription.PostUnsubscribe;

/// <summary>
/// Обработчик для <see cref="PostUnsubscribeCommand"/>
/// </summary>
public class PostUnsubscribeCommandHandler : IRequestHandler<PostUnsubscribeCommand>
{
    private readonly ISubscriptionHandler _subscriptionHandler;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="subscriptionHandler">Сервис для управления подписками</param>
    /// <param name="userContext">Контекст текущего пользователя</param>
    public PostUnsubscribeCommandHandler(ISubscriptionHandler subscriptionHandler, IUserContext userContext)
    {
        _subscriptionHandler = subscriptionHandler;
        _userContext = userContext;
    }

    /// <inheritdoc/>
    public async Task Handle(PostUnsubscribeCommand request, CancellationToken cancellationToken)
    {
        var userId = _userContext.CurrentUserId;

        if (userId is null)
            throw new SubscriptionInternalException("User not found");

        var result = await _subscriptionHandler.Unsubscribe(userId.Value);

        if (!result)
            throw new SubscriptionInternalException("Internal error");
    }
}