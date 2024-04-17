namespace RussianSpotify.Contracts.Requests.File.DeleteFile;

public class DeleteFileRequest
{
    public DeleteFileRequest()
    {
    }

    public DeleteFileRequest(DeleteFileRequest request)
    {
        FileId = request.FileId;
    }

    public Guid FileId { get; set; }
}