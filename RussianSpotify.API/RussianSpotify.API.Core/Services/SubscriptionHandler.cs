using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.SubscriptionExceptions;
using RussianSpotify.Contracts.Requests.Subscription.GetSubscription;

namespace RussianSpotify.API.Core.Services;

public class SubscriptionHandler : ISubscriptionHandler
{
    private readonly IDbContext _context;

    public SubscriptionHandler(IDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Subscribe(Guid userId, int length)
    {
        if (length < 1)
            throw new SubscriptionBadRequestException("Length must be greater than 0");

        var subscription = await _context.Subscribes
            .FirstOrDefaultAsync(i => i.UserId == userId);

        var dateSpan = new TimeSpan(length * 30, 0, 0, 0);
        if (subscription is null)
        {
            var currentDateTime = DateTime.UtcNow;
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
            if (subscription.DateEnd > DateTime.UtcNow)
                throw new SubscriptionConflictException("This user is currently subscribed");

            var currentDateTime = DateTime.UtcNow;
            subscription.DateStart = currentDateTime;
            subscription.DateEnd = currentDateTime + dateSpan;
            await _context.SaveChangesAsync();
        }

        return true;
    }

    public async Task<bool> Unsubscribe(Guid userId)
    {
        var subscription = await _context.Subscribes
            .FirstOrDefaultAsync(i => i.UserId == userId);

        if (subscription is null)
            throw new NotFoundException("This user is not subscribed");

        if (subscription.DateEnd < DateTime.UtcNow)
            throw new SubscriptionConflictException("This user does not have active subscription");

        subscription.DateEnd = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<GetSubscriptionResponse> GetSubscription(Guid userId)
    {
        var subscription = await _context.Subscribes
            .FirstOrDefaultAsync(i => i.UserId == userId);

        if (subscription is null)
            throw new SubscriptionNotFoundException("This user is not subscribed");

        if (subscription.DateStart is null || subscription.DateEnd is null)
            throw new SubscriptionInternalException("DateStart or DateEnd is null");

        var getSubscriptionResponse = new GetSubscriptionResponse
        {
            StartDate = subscription.DateStart.Value,
            EndDate = subscription.DateEnd.Value
        };

        return getSubscriptionResponse;
    }
}