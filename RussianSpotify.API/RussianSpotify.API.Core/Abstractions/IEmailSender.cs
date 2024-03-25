namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Позволяет отправлять письма на почту
/// </summary>
public interface IEmailSender
{
    /// <summary>
    /// Отправление письма на почту
    /// </summary>
    /// <param name="to">Email адрес, кому надо надо отправить</param>
    /// <param name="message">Письмо</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public Task SendEmailAsync(string to, string message, CancellationToken cancellationToken);

    /// <summary>
    /// Отправление письма на почту
    /// </summary>
    /// <param name="to">Email адрес, кому надо надо отправить</param>
    /// <param name="message">Письмо</param>
    /// <param name="subject">Тема письма</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public Task SendEmailAsync(
        string to,
        string message,
        string subject,
        CancellationToken cancellationToken);
}