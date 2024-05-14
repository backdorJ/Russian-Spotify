using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AuthExceptions;

/// <summary>
/// Если у пользователя не подтвержён Email, но он хочет залогиниться
/// </summary>
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