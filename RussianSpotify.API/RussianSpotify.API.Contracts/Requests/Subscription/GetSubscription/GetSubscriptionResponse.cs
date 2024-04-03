namespace RussianSpotify.Contracts.Requests.Subscription.GetSubscription;

/// <summary>
/// Ответ для запроса на получение данных о подписке пользователя
/// </summary>
public class GetSubscriptionResponse
{
    /// <summary>
    /// Дата начала подписки
    /// </summary>
    public DateTime? StartDate { get; set; }
    
    /// <summary>
    /// Дата окончания подписки
    /// </summary>
    public DateTime? EndDate { get; set; }
}