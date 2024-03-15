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
    public Task SendEmail(string to, string message, CancellationToken cancellationToken);
}