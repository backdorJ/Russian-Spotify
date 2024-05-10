namespace RussianSpotify.Contracts.Requests.Author.GetAuthor;

/// <summary>
/// Информация об авторе
/// </summary>
public class GetAuthorResponse
{
    /// <summary>
    /// Имя автора
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Id фотографии автора
    /// </summary>
    public Guid? AuthorPhotoId { get; set; }
}