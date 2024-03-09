namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

/// <summary>
/// Исключение выбрасывается при логине пользователя, если он ввёл неверный пароль от учётной записи
/// </summary>
public class WrongPasswordException : ApplicationBaseException
{
    public WrongPasswordException(string message) : base(message)
    {
    }

    public WrongPasswordException()
    {
    }
}