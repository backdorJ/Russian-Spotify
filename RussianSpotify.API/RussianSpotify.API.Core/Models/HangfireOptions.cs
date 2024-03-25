namespace RussianSpotify.API.Core.Models;

/// <summary>
/// Настройки для Hangfire (тут будут кроны)
/// </summary>
public class HangfireOptions
{
    /// <summary>
    /// Показывать Dasboard
    /// </summary>
    public bool DisplayDashBoard { get; set; }

    /// <summary>
    /// Крон для уведомлений подписки
    /// </summary>
    public string CronForSendNotificationSubscribe { get; set; } = default!;

    /// <summary>
    /// Крон для старта рассылки уведомлений
    /// </summary>
    public string CronForSendEmailNotificator { get; set; } = default!;
}