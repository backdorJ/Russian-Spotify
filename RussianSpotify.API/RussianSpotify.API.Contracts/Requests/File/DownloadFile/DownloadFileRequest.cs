namespace RussianSpotify.Contracts.Requests.File.DownloadFile;

/// <summary>
/// Запрос на скачивание файла
/// </summary>
public class DownloadFileRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="id">ИД файла</param>
    protected DownloadFileRequest(Guid id)
        => Id = id;
    
    /// <summary>
    /// ИД файла
    /// </summary>
    public Guid Id { get; }
}