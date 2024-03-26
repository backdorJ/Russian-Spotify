using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;

namespace RussianSpotify.API.Core.Requests.EmailNotificator.SendEmailNotification;

/// <summary>
/// Обработчик для <see cref="SendEmailNotificationCommand"/>
/// </summary>
public class SendEmailNotificationCommandHandler : IRequestHandler<SendEmailNotificationCommand>
{
    private const int TakeCount = 50;
    
    private readonly IDbContext _dbContext;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IEmailSender _emailSender;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="dateTimeProvider">Провайдер дат</param>
    /// <param name="emailSender">Работа с почтой</param>
    public SendEmailNotificationCommandHandler(
        IDbContext dbContext,
        IDateTimeProvider dateTimeProvider,
        IEmailSender emailSender)
    {
        _dbContext = dbContext;
        _dateTimeProvider = dateTimeProvider;
        _emailSender = emailSender;
    }

    /// <inheritdoc />
    public async Task Handle(SendEmailNotificationCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        while (true)
        {
            var emailNotifications = await _dbContext.EmailNotifications
                .Where(x => x.SentDate == null)
                .Take(TakeCount)
                .ToListAsync(cancellationToken);

            if (!emailNotifications.Any())
                break;

            foreach (var emailNotification in emailNotifications)
            {
                await _emailSender.SendEmailAsync(
                    to: emailNotification.EmailTo,
                    message: emailNotification.Body,
                    subject: emailNotification.Head,
                    cancellationToken: cancellationToken);

                emailNotification.SentDate = _dateTimeProvider.CurrentDate;
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}