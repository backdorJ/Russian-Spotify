using RussianSpotify.Contracts.Requests.Subscription.GetSubscription;

namespace RussianSpotify.API.Core.Abstractions;

public interface ISubscriptionHandler
{
    Task<bool> Subscribe(Guid userId, int length);
    Task<bool> Unsubscribe(Guid userId);
    Task<GetSubscriptionResponse> GetSubscription(Guid userId);
}