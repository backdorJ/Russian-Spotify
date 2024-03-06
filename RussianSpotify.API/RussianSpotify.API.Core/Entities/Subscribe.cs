namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Сущность подписка
/// </summary>
public class Subscribe
{
    /// <summary>
    /// ИД подписки
    /// </summary>
    public Guid Id { get; protected set; }

    /// <summary>
    /// Начало подписки
    /// </summary>
    public DateTime? DateStart { get; protected set; }

    /// <summary>
    /// Конец подписки
    /// </summary>
    public DateTime? DateEnd { get; protected set; }

    /// <summary>
    /// Пользователь
    /// </summary>
    public User User { get; set; }

    /// <summary>
    /// ИД Пользователь
    /// </summary>
    public Guid UserId { get; set; }
}