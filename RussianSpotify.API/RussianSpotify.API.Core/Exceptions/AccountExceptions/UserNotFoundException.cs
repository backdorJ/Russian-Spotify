using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

/// <summary>
/// Если user не найден по id
/// </summary>
public class UserNotFoundException : ApplicationBaseException
{
    public UserNotFoundException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        : base(message, statusCode)
    {
    }
    
    public UserNotFoundException()
    {
    }
}