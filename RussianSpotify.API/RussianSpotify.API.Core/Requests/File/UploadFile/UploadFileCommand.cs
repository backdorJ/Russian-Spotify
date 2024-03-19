using MediatR;
using RussianSpotify.Contracts.Requests.File.UploadFile;

namespace RussianSpotify.API.Core.Requests.File.UploadFile;

/// <summary>
/// Команда на загрузку файла
/// </summary>
public class UploadFileCommand : UploadRequest, IRequest<UploadFileResponse>
{
    /// <inheritdoc />
    public UploadFileCommand(IEnumerable<UploadRequestItem> files)
        : base(files)
    {
    }
}