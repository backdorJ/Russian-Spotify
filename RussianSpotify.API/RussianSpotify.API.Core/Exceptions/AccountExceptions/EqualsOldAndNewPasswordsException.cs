using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

public class EqualsOldAndNewPasswordsException : ApplicationBaseException
{
    public EqualsOldAndNewPasswordsException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        : base(message, statusCode)
    {
    }

    public EqualsOldAndNewPasswordsException()
    {
    }
}