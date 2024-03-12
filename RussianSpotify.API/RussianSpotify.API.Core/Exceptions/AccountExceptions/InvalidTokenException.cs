using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

public class InvalidTokenException : ApplicationBaseException
{
    public InvalidTokenException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest) 
        : base(message, statusCode)
    {
    }

    public InvalidTokenException()
    {
    }
}