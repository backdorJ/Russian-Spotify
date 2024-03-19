namespace RussianSpotify.Contracts.Requests.File.UploadFile;

/// <summary>
/// Запрос на добавления файлов
/// </summary>
public class UploadRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="files">Файлы</param>
    public UploadRequest(IEnumerable<UploadRequestItem> files)
        => Files = files;
    
    /// <summary>
    /// Файлы
    /// </summary>
    public IEnumerable<UploadRequestItem> Files { get; set; }
}