namespace RussianSpotify.API.Core.Exceptions.AccountExceptions;

/// <summary>
/// Исключение выбрасывается, если пользователь пытается зарегистрироваться с почтой, которая уже есть в бд
/// </summary>
public class EmailAlreadyRegisteredException: ApplicationBaseException
{
    public EmailAlreadyRegisteredException(string message) : base(message)
    {
    }

    public EmailAlreadyRegisteredException()
    {
    }
}