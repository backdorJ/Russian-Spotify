using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

public class ResetPasswordException : ApplicationBaseException
{
    public ResetPasswordException(string message, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        : base(message, statusCode)
    {
    }

    public ResetPasswordException()
    {
    }
}