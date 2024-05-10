namespace RussianSpotify.Contracts.Requests;

/// <summary>
/// Базовый ответ в байтах
/// </summary>
public class BaseFileBytesResponse
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="content">Контент</param>
    /// <param name="contentType">Тип контента</param>
    /// <param name="fileName">Название файла</param>
    public BaseFileBytesResponse(
        byte[] content,
        string contentType,
        string fileName)
    {
        Content = content;
        ContentType = contentType;
        FileName = fileName;
    }

    /// <summary>
    /// Содержимое
    /// </summary>
    public byte[] Content { get; set; }

    /// <summary>
    /// Тип контента
    /// </summary>
    public string ContentType { get; set; }

    /// <summary>
    /// Название файла
    /// </summary>
    public string? FileName { get; set; }
}