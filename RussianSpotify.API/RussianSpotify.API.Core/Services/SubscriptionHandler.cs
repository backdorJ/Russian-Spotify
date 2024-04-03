using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.SubscriptionExceptions;
using RussianSpotify.Contracts.Requests.Subscription.GetSubscription;

namespace RussianSpotify.API.Core.Services;

/// <inheritdoc/>
public class SubscriptionHandler : ISubscriptionHandler
{
    private readonly IDbContext _context;
    private readonly IDateTimeProvider _dateTimeProvider;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="context">Контекст БД</param>
    /// <param name="dateTimeProvider">Провайдер дат</param>
    public SubscriptionHandler(
        IDbContext context,
        IDateTimeProvider dateTimeProvider)
    {
        _context = context;
        _dateTimeProvider = dateTimeProvider;
    }

    /// <inheritdoc/>
    public async Task<bool> Subscribe(Guid userId, int length)
    {
        if (length < 1)
            throw new SubscriptionBadRequestException("Length must be greater than 0");

        var subscription = await _context.Subscribes
            .FirstOrDefaultAsync(i => i.UserId == userId);

        var dateSpan = new TimeSpan(length * 30, 0, 0, 0);
        var currentDateTime = _dateTimeProvider.CurrentDate;
        if (subscription is null)
        {
            var newSubscription = new Subscribe
            {
                DateStart = currentDateTime,
                DateEnd = currentDateTime + dateSpan,
                UserId = userId
            };

            await _context.Subscribes.AddAsync(newSubscription);
            await _context.SaveChangesAsync();
        }
        else
        {
            if (subscription.DateEnd > currentDateTime)
                throw new SubscriptionConflictException("This user is currently subscribed");
            
            subscription.DateStart = currentDateTime;
            subscription.DateEnd = currentDateTime + dateSpan;
            await _context.SaveChangesAsync();
        }

        return true;
    }

    /// <inheritdoc/>
    public async Task<bool> Unsubscribe(Guid userId)
    {
        var subscription = await _context.Subscribes
            .FirstOrDefaultAsync(i => i.UserId == userId);

        if (subscription is null)
            throw new SubscriptionNotFoundException("This user is not subscribed");

        if (!subscription.DateEnd.HasValue)
            throw new SubscriptionBadRequestException("DateEnd is null");
        
        if (subscription.DateEnd.Value.Date < _dateTimeProvider.CurrentDate.Date)
            throw new SubscriptionConflictException("This user does not have active subscription");

        subscription.DateEnd = _dateTimeProvider.CurrentDate;
        await _context.SaveChangesAsync();
        return true;
    }

    /// <inheritdoc/>
    public async Task<GetSubscriptionResponse> GetSubscription(Guid userId)
    {
        var subscription = await _context.Subscribes
            .FirstOrDefaultAsync(i => i.UserId == userId);

        if (subscription?.DateStart is null || subscription.DateEnd is null)
            return new GetSubscriptionResponse
            {
                StartDate = null,
                EndDate = null
            };

        var getSubscriptionResponse = new GetSubscriptionResponse
        {
            StartDate = subscription.DateStart.Value,
            EndDate = subscription.DateEnd.Value
        };

        return getSubscriptionResponse;
    }
}