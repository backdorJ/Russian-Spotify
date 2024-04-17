using MediatR;
using RussianSpotify.Contracts.Requests.File.DeleteFile;

namespace RussianSpotify.API.Core.Requests.File.DeleteFile;

public class DeleteFileCommand : DeleteFileRequest, IRequest
{
    public DeleteFileCommand(DeleteFileRequest request) : base(request)
    {
    }
}