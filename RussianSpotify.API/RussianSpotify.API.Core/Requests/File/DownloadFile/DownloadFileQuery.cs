using MediatR;
using RussianSpotify.Contracts.Requests.File.DownloadFile;

namespace RussianSpotify.API.Core.Requests.File.DownloadFile;

/// <summary>
/// Запрос на получение файла
/// </summary>
public class DownloadFileQuery : DownloadFileRequest, IRequest<DownloadFileResponse>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="id">ИД файла</param>
    public DownloadFileQuery(Guid id)
        : base(id)
    {
    }
}