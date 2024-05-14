using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AuthExceptions;

/// <summary>
/// Исключение выбрасывается при логине пользователя, если не удалось найти пользователя с нужной почтой
/// </summary>
public class NotFoundUserException : ApplicationBaseException
{
    public NotFoundUserException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        : base(message, statusCode)
    {
    }

    public NotFoundUserException()
    {
    }
}