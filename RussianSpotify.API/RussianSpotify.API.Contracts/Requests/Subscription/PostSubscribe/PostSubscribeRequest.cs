namespace RussianSpotify.Contracts.Requests.Subscription.PostSubscribe;

public class PostSubscribeRequestHttp
{
    public int SubscriptionLength { get; set; }

    protected PostSubscribeRequestHttp(PostSubscribeRequestHttp postSubscribeRequestHttp)
    {
        SubscriptionLength = postSubscribeRequestHttp.SubscriptionLength;
    }

    public PostSubscribeRequestHttp() { }
}