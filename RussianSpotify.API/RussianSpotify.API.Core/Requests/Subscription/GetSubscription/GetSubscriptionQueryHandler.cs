using MediatR;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.SubscriptionExceptions;
using RussianSpotify.Contracts.Requests.Subscription.GetSubscription;

namespace RussianSpotify.API.Core.Requests.Subscription.GetSubscription;

/// <summary>
/// Обработчик для <see cref="GetSubscriptionQuery"/>
/// </summary>
public class GetSubscriptionQueryHandler : IRequestHandler<GetSubscriptionQuery, GetSubscriptionResponse>
{
    private readonly ISubscriptionHandler _subscriptionHandler;
    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="subscriptionHandler">Сервис для управления подписками</param>
    /// <param name="userContext">Контекст текущего пользователя</param>
    public GetSubscriptionQueryHandler(ISubscriptionHandler subscriptionHandler, IUserContext userContext)
    {
        _subscriptionHandler = subscriptionHandler;
        _userContext = userContext;
    }

    /// <inheritdoc />
    public async Task<GetSubscriptionResponse> Handle(GetSubscriptionQuery request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var userId = _userContext.CurrentUserId;

        if (userId is null)
            throw new SubscriptionInternalException("User not found");

        return await _subscriptionHandler.GetSubscription(userId.Value);
    }
}