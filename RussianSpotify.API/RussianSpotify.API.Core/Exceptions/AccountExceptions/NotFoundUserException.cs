namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

/// <summary>
/// Исключение выбрасывается при логине пользователя, если не удалось найти пользователя с нужной почтой
/// </summary>
public class NotFoundUserException : ApplicationBaseException
{
    public NotFoundUserException(string message) : base(message)
    {
    }

    public NotFoundUserException()
    {
    }
}