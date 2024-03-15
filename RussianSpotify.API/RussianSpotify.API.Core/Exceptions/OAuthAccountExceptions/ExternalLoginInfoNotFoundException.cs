using System.Net;

namespace RussianSpotify.API.Core.Exceptions.OAuthAccountExceptions;

/// <summary>
/// Если после авторизации через сторонний сервис не найдено ExternalLoginInfo
/// </summary>
public class ExternalLoginInfoNotFoundException : ApplicationBaseException
{
    public ExternalLoginInfoNotFoundException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        : base(message, statusCode)

    {
    }

    public ExternalLoginInfoNotFoundException()
    {
    }
}