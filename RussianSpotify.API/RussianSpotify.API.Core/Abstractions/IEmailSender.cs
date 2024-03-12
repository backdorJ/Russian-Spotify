namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Позволяет отправлять письма на почту
/// </summary>
public interface IEmailSender
{
    public Task SendEmail(string to, string message, CancellationToken cancellationToken);
}