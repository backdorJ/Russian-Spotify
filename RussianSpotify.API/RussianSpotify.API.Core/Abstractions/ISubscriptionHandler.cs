using RussianSpotify.Contracts.Requests.Subscription.GetSubscription;

namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Сервис, отвечающий за управление подписками
/// </summary>
public interface ISubscriptionHandler
{
    /// <summary>
    /// Оформить подписку
    /// </summary>
    /// <param name="userId">Айди пользователя, нак кого оформляется подписка</param>
    /// <param name="length">Количество месяцев, в течение которые будет действовать подписка</param>
    /// <returns>Успешность операции</returns>
    Task<bool> Subscribe(Guid userId, int length);

    /// <summary>
    /// Отменить подписку
    /// </summary>
    /// <param name="userId">Айди пользователя, которому отменяются подписку</param>
    /// <returns>Успешность операции</returns>
    Task<bool> Unsubscribe(Guid userId);

    /// <summary>
    /// Получить информацию по подписке пользователя
    /// </summary>
    /// <param name="userId">Айди пользователя, чья подписка получается</param>
    /// <returns><see cref="GetSubscriptionResponse"/>, содержащая информацию о подписке пользователя</returns>
    Task<GetSubscriptionResponse> GetSubscription(Guid userId);
}