using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using RussianSpotify.API.Core.Requests.File.DownloadFile;
using RussianSpotify.API.Core.Requests.File.UploadFile;
using RussianSpotify.Contracts.Requests;
using RussianSpotify.Contracts.Requests.File.UploadFile;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер для файлов
/// </summary>
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class FileController : ControllerBase
{
    private const string DefaultContentType = "application/octet-stream";
    private const string DefaultContentDisposition = "attachment";
    
    /// <summary>
    /// Загрузить файл
    /// </summary>
    /// <param name="files">Файлы</param>
    /// <param name="mediator">Медиатор CQRS</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns></returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<UploadFileResponse> UploadFileAsync(
        [FromForm] List<IFormFile>? files,
        [FromServices] IMediator mediator,
        CancellationToken cancellationToken)
        => await mediator.Send(new UploadFileCommand(GetEnumerableFiles(files)), cancellationToken);
    
    /// <summary>
    /// Скачать файл
    /// </summary>
    /// <param name="id">ИД файла</param>
    /// <param name="mediator">Медиатор CQRS</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns></returns>
    [HttpGet("{id}/Download")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<FileStreamResult> DownloadFileAsync(
        [FromRoute] Guid id,
        [FromServices] IMediator mediator,
        CancellationToken cancellationToken)
    {
        var file = await mediator.Send(new DownloadFileQuery(id), cancellationToken);

        return GetFileStreamResult(file, Response.Headers);
    }
    
    private static FileStreamResult GetFileStreamResult(
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
    
    private static IEnumerable<UploadRequestItem> GetEnumerableFiles(List<IFormFile>? files)
    {
        foreach (var file in files ?? new List<IFormFile>())
        {
            using var stream = file.OpenReadStream();
            yield return new UploadRequestItem(stream, file.FileName, file.ContentType);
        }
    }
}