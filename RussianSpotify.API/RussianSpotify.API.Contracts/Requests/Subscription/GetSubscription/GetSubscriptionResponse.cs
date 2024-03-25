namespace RussianSpotify.Contracts.Requests.Subscription.GetSubscription;

/// <summary>
/// Ответ для запроса на получение данных о подписке пользователя
/// </summary>
public class GetSubscriptionResponse
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}