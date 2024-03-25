using MediatR;
using Microsoft.Extensions.Logging;
using RussianSpotify.API.Core.Requests.EmailNotificator.SendEmailNotification;

namespace RussianSpotify.API.Worker.Workers;

public class EmailNotificator : IWorker
{
    private readonly ILogger<EmailNotificator> _logger;
    private readonly IMediator _mediator;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="logger">Логгер</param>
    /// <param name="mediator">Медиатор CQRS</param>
    public EmailNotificator(ILogger<EmailNotificator> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    /// <inheritdoc />
    public async Task RunAsync()
    {
        _logger.LogInformation("Running email notifcator");

        await _mediator.Send(new SendEmailNotificationCommand());
    }
}