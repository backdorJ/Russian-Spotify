namespace RussianSpotify.Contracts.Requests.File.UploadFile;

/// <summary>
/// Ответ на загрузку файла
/// </summary>
public class UploadFileResponse
{
    public UploadFileResponse()
        => FileNameToIds = new List<UploadFileResponseItem>();

    public UploadFileResponse(IEnumerable<UploadFileResponseItem> files)
        => FileNameToIds = files.ToList() ?? new List<UploadFileResponseItem>();
    
    public List<UploadFileResponseItem> FileNameToIds { get; set; }
}