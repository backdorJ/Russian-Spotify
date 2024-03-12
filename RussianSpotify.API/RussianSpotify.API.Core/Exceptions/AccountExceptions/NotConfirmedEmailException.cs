using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

public class NotConfirmedEmailException : ApplicationBaseException
{
    public NotConfirmedEmailException(string message,
        HttpStatusCode statusCode = HttpStatusCode.BadRequest) : base(message, statusCode)
    {
    }
    
    public NotConfirmedEmailException()
    {
    }
}