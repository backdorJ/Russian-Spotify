namespace RussianSpotify.API.Core.Exceptions;

/// <summary>
/// Ошибка об забытом Include
/// </summary>
public class NotIncludedException : ApplicationBaseException
{
    /// <summary>
    /// Консутрктор
    /// </summary>
    /// <param name="message"></param>
    public NotIncludedException(string message)
        : base($"Забыли incled на файл: {message}")
    {
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    public NotIncludedException()
    {
    }
}