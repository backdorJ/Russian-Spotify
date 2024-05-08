namespace RussianSpotify.Contracts.Requests;

/// <summary>
/// Ответ в виде потока
/// </summary>
public class BaseFileStreamResponse
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="content">Контент</param>
    /// <param name="fileName">Название файла</param>
    /// <param name="contentType">Тип контента</param>
    public BaseFileStreamResponse(
        Stream content,
        string fileName,
        string contentType)
    {
        Content = content;
        FileName = fileName;
        ContentType = contentType;
    }

    /// <summary>
    /// Контент
    /// </summary>
    public Stream Content { get; }

    /// <summary>
    /// Название файла
    /// </summary>
    public string FileName { get; set; }

    /// <summary>
    /// Тип файла
    /// </summary>
    public string ContentType { get; set; }
}