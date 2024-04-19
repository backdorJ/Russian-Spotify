using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AuthExceptions;

/// <summary>
/// Если токен, который был отправлен на почту и токен, отправленный пользователем не совпадают
/// </summary>
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