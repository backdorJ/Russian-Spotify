using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

/// <summary>
/// Исключение выбрасывается при логине пользователя, если он ввёл неверный пароль от учётной записи
/// </summary>
public class WrongPasswordException : ApplicationBaseException
{
    public WrongPasswordException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        : base(message, statusCode)
    {
    }

    public WrongPasswordException()
    {
    }
}