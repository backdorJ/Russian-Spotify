using MediatR;
using RussianSpotify.Contracts.Requests.File.DeleteFile;

namespace RussianSpotify.API.Core.Requests.File.DeleteFile;

/// <summary>
/// Команда на удаление файла из хранилища и бд
/// </summary>
public class DeleteFileCommand : DeleteFileRequest, IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public DeleteFileCommand(DeleteFileRequest request) : base(request)
    {
    }
}