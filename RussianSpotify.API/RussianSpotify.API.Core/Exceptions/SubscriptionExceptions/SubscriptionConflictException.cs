namespace RussianSpotify.API.Core.Exceptions.SubscriptionExceptions;

public class SubscriptionConflictException : ConflictException
{
    public SubscriptionConflictException(string message) : base(message)
    {
    }
}