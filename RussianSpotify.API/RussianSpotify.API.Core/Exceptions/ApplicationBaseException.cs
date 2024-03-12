using System.Net;

namespace RussianSpotify.API.Core.Exceptions;

/// <summary>
/// Базовый класс ошибок
/// </summary>
public class ApplicationBaseException : Exception
{
    public HttpStatusCode ResponseStatusCode { get; set; }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="message"></param>
    public ApplicationBaseException()
    {
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="message">Сообщение об ошибке</param>
    /// <param name="statusCode">Код ошибки</param>
    public ApplicationBaseException(string message, HttpStatusCode statusCode)
        : base(message)
    {
        ResponseStatusCode = statusCode;
    }
}