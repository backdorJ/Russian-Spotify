namespace RussianSpotify.Contracts.Requests.Music.GetSongContentById;

/// <summary>
/// Вернуть стрим музыки
/// </summary>
public class GetSongContentByIdResponse : BaseFileStreamResponse
{
    /// <inheritdoc />
    public GetSongContentByIdResponse(
        Stream content,
        string fileName,
        string contentType)
        : base(content, fileName, contentType)
    {
    }
}