namespace RussianSpotify.Contracts.Requests.File.DeleteFile;

/// <summary>
/// Запрос на удаление файла из хранилища и бд
/// </summary>
public class DeleteFileRequest
{
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public DeleteFileRequest()
    {
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public DeleteFileRequest(DeleteFileRequest request)
    {
        FileId = request.FileId;
    }

    /// <summary>
    /// Id файла для удаления
    /// </summary>
    public Guid FileId { get; set; }
}