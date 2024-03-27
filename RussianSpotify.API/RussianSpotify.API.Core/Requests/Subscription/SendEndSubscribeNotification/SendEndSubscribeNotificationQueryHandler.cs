using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Models;

namespace RussianSpotify.API.Core.Requests.Subscription.SendEndSubscribeNotification;

/// <summary>
/// Обработчик для <see cref="SendEndSubscribeNotificationQuery"/>
/// </summary>
public class SendEndSubscribeNotificationQueryHandler : IRequestHandler<SendEndSubscribeNotificationQuery>
{
    private const int NoticeInterval = -7;
    
    private readonly IDbContext _dbContext;
    private readonly IDateTimeProvider _dateTimeProvider;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="dateTimeProvider">Провайдер дат</param>
    public SendEndSubscribeNotificationQueryHandler(
        IDbContext dbContext,
        IDateTimeProvider dateTimeProvider)
    {
        _dbContext = dbContext;
        _dateTimeProvider = dateTimeProvider;
    }

    /// <inheritdoc />
    public async Task Handle(SendEndSubscribeNotificationQuery request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var subscribes = await _dbContext.Subscribes
            .Include(x => x.User)
            .Where(x => x.DateEnd.HasValue)
            .Where(x => x.DateEnd!.Value.Date == _dateTimeProvider.CurrentDate.Date.AddDays(NoticeInterval))
            .ToListAsync(cancellationToken);

        if (!subscribes.Any())
            return;

        foreach (var subscribe in subscribes)
            await AddEmailNotificationAsync(subscribe, cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task AddEmailNotificationAsync(Subscribe subscribe,
        CancellationToken cancellationToken)
    {
        if (subscribe.User is null)
            throw new NotIncludedException(nameof(User));
        
        var placeholders = new Dictionary<string, string>
        {
            ["{username}"] = subscribe.User.UserName ?? subscribe.User.Email!,
        };

        var emailNotification = await EmailTemplateHelper
            .GetEmailNotificationAsync(
                placeholders: placeholders,
                template: Templates.SendEndSubscribeNotification,
                head: "Истекает срок подписки",
                emailTo: subscribe.User.Email!,
                cancellationToken: cancellationToken);

        await _dbContext.EmailNotifications.AddAsync(emailNotification, cancellationToken);
    }
}