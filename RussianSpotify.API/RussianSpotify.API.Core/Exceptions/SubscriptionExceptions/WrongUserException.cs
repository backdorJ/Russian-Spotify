using Microsoft.AspNetCore.Mvc;

namespace RussianSpotify.API.Core.Exceptions.SubscriptionExceptions;

public class WrongUserException : BadRequestException
{
    public WrongUserException(string message) : base(message)
    {
    }
}