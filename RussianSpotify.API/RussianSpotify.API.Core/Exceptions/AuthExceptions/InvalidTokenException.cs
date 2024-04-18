using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AuthExceptions;

/// <summary>
/// Если пришёл не валидный JWT или Refresh Token
/// </summary>
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