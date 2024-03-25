namespace RussianSpotify.API.Core.Exceptions.SubscriptionExceptions;

public class SubscriptionNotFoundException : NotFoundException
{
    public SubscriptionNotFoundException(string message) : base(message)
    {
    }
}