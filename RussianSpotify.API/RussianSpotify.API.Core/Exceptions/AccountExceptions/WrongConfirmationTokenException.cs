using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

public class WrongConfirmationTokenException : ApplicationBaseException
{
    public WrongConfirmationTokenException(string message,
        HttpStatusCode statusCode = HttpStatusCode.BadRequest) : base(message, statusCode)
    {
    }

    public WrongConfirmationTokenException()
    {
    }
}