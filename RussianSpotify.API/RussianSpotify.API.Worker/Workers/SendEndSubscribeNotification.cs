using MediatR;
using Microsoft.Extensions.Logging;
using RussianSpotify.API.Core.Requests.Subscription.SendEndSubscribeNotification;

namespace RussianSpotify.API.Worker.Workers;

public class SendEndSubscribeNotification : IWorker
{
    private readonly ILogger<SendEndSubscribeNotification> _logger;
    private readonly IMediator _mediator;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="logger">Логгер</param>
    /// <param name="mediator">Медиатор</param>
    public SendEndSubscribeNotification(
        ILogger<SendEndSubscribeNotification> logger,
        IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    /// <inheritdoc />
    public async Task RunAsync()
    {
        _logger.LogInformation("Send notification for subscribe...");

        await _mediator.Send(new SendEndSubscribeNotificationQuery());
    }
}