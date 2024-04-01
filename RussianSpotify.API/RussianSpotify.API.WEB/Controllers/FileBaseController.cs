using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using RussianSpotify.Contracts.Requests;
using RussianSpotify.Contracts.Requests.File.UploadFile;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Базовый класс для отправки файлов
/// </summary>
public class FileBaseController : ControllerBase
{
    private const string DefaultContentType = "application/octet-stream";
    private const string DefaultContentDisposition = "attachment";
    
    /// <summary>
    /// Отправить файл на фронт
    /// </summary>
    /// <param name="file">Файл</param>
    /// <param name="headers">Заголовки</param>
    /// <param name="inline">В строку</param>
    /// <returns>Файл</returns>
    protected static FileStreamResult GetFileStreamResult(
        BaseFileStreamResponse file,
        IHeaderDictionary headers,
        bool inline = false)
    {
        if (file is null)
            throw new ArgumentNullException(nameof(file));

        var cd = new ContentDispositionHeaderValue(inline ? "inline" : DefaultContentDisposition);
        cd.SetHttpFileName(file.FileName);
        headers[HeaderNames.ContentDisposition] = cd.ToString();

        if (file.Content.CanSeek)
            file.Content.Seek(0, SeekOrigin.Begin);

        return new FileStreamResult(file.Content, file.ContentType);
    }
    
    /// <summary>
    /// Загрузить все файлы
    /// </summary>
    /// <param name="files">Файлы</param>
    /// <returns>Загруженные файлы</returns>
    protected static IEnumerable<UploadRequestItem> GetEnumerableFiles(List<IFormFile>? files)
    {
        foreach (var file in files ?? new List<IFormFile>())
        {
            using var stream = file.OpenReadStream();
            yield return new UploadRequestItem(stream, file.FileName, file.ContentType);
        }
    }
}