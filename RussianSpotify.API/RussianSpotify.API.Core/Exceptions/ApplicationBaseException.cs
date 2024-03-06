namespace RussianSpotify.API.Core.Exceptions;

/// <summary>
/// Базовый класс ошибок
/// </summary>
public class ApplicationBaseException : Exception
{
    /// <summary>
    /// Конструктор
    /// </summary>
    public ApplicationBaseException()
    {
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="message">Сообщение об ошибке</param>
    public ApplicationBaseException(string message)
        : base(message)
    {
    }
}