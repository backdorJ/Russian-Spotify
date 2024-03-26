namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Сущность уведомления
/// </summary>
public class EmailNotification
{
    /// <summary>
    /// ИД сущности
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Содержимое уведомления
    /// </summary>
    public string Body { get; set; } = default!;

    /// <summary>
    /// Голова уведомления
    /// </summary>
    public string Head { get; set; } = default!;

    /// <summary>
    /// Отправлено сообщение
    /// </summary>
    public DateTime? SentDate { get; set; }

    /// <summary>
    /// Получатель
    /// </summary>
    public string EmailTo { get; set; } = default!;

    /// <summary>
    /// Создать уведомление
    /// </summary>
    /// <param name="body">Содержимое</param>
    /// <param name="head">Голова сообещния</param>
    /// <param name="emailTo">Кому</param>
    /// <returns>Уведомление</returns>
    public static EmailNotification CreateNotification(
        string body,
        string head,
        string emailTo)
        => new EmailNotification
        {
            Body = body,
            Head = head,
            EmailTo = emailTo,
            SentDate = null
        };
}