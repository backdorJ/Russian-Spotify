namespace RussianSpotify.Contracts.Requests.File.UploadFile;

/// <summary>
/// Элемент ответа для <see cref="UploadFileResponse"/>
/// </summary>
public class UploadFileResponseItem
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="fileName">Название файла</param>
    /// <param name="fileId">ИД файла</param>
    public UploadFileResponseItem(string fileName, Guid fileId)
    {
        FileName = fileName;
        FileId = fileId;
    }
    
    /// <summary>
    /// Название файла
    /// </summary>
    public string FileName { get; set; }

    /// <summary>
    /// ИД файла
    /// </summary>
    public Guid FileId { get; set; }
}