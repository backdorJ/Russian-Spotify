using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

public class InvalidChangePasswordException : ApplicationBaseException
{
    public InvalidChangePasswordException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        : base(message, statusCode)
    {
    }

    public InvalidChangePasswordException()
    {
    }
}