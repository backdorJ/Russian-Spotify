namespace RussianSpotify.Contracts.Requests.File.GetImageById;

/// <summary>
/// Ответ на запрос полчения фотки
/// </summary>
public class GetImageByIdResponse : BaseFileBytesResponse
{
    /// <inheritdoc />
    public GetImageByIdResponse(
        byte[] content,
        string contentType,
        string fileName)
        : base(content, contentType, fileName)
    {
    }
}