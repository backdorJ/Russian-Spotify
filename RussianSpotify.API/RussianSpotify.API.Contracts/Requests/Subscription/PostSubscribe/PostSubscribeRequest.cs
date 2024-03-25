namespace RussianSpotify.Contracts.Requests.Subscription.PostSubscribe;

/// <summary>
/// Запрос для оформления подписки
/// </summary>
public class PostSubscribeRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="postSubscribeRequest">Запрос</param>
    protected PostSubscribeRequest(PostSubscribeRequest postSubscribeRequest)
    {
        SubscriptionLength = postSubscribeRequest.SubscriptionLength;
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    public PostSubscribeRequest() { }
    
    public int SubscriptionLength { get; set; }
}