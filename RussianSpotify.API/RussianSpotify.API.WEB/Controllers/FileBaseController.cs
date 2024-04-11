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
    private const string DefaultContentDisposition = "attachment";

    /// <summary>
    /// Отправить файл на фронт
    /// </summary>
    /// <param name="file">Файл</param>
    /// <param name="headers">Заголовки</param>
    /// <param name="inline">В строку</param>
    /// <param name="customHeaders">Добавить кастомные заголовки</param>
    /// <returns>Файл</returns>
    protected FileStreamResult GetFileStreamResult(
        BaseFileStreamResponse file,
        IHeaderDictionary headers,
        bool inline = false,
        bool customHeaders = false)
    {
        if (file is null)
            throw new ArgumentNullException(nameof(file));
        
        var cd = new ContentDispositionHeaderValue(inline ? "inline" : DefaultContentDisposition);
        cd.SetHttpFileName(file.FileName);
        headers[HeaderNames.ContentDisposition] = cd.ToString();

        if (customHeaders)
        {
            Response.Headers.ContentDisposition = new ContentDispositionHeaderValue(DefaultContentDisposition).ToString();
            Response.ContentLength = file.Content.Length;
            Response.Headers.AcceptRanges = "bytes";
            Response.Headers.CacheControl = "max-age=14400";
        }

        if (file.Content.CanSeek)
            file.Content.Seek(0, SeekOrigin.Begin);

        return new FileStreamResult(file.Content, file.ContentType);
    }

    /// <summary>
    /// Отправить файл в байтах
    /// </summary>
    /// <param name="file">Файл</param>
    /// <returns>Файл в байтах</returns>
    protected static FileContentResult GetFileBytes(BaseFileBytesResponse file)
    {
        if (file is null)
            throw new ArgumentNullException(nameof(file));

        return new FileContentResult(fileContents: file.Content, contentType: file.ContentType)
        {
            FileDownloadName = file.FileName,
        };
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