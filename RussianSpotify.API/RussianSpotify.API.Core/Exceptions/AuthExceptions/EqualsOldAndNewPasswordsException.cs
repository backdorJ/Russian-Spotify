using System.Net;

namespace RussianSpotify.API.Core.Exceptions.AuthExceptions;

/// <summary>
/// Если новый пароль и старый совпадают
/// </summary>
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