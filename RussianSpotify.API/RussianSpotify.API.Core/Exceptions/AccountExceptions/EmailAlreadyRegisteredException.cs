using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

/// <summary>
/// Исключение выбрасывается, если пользователь пытается зарегистрироваться с почтой, которая уже есть в бд
/// </summary>
public class EmailAlreadyRegisteredException : ApplicationBaseException
{
    public EmailAlreadyRegisteredException(string message,
        HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        : base(message, statusCode)
    {
    }

    public EmailAlreadyRegisteredException() 
    {
    }
}