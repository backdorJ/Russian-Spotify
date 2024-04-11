namespace RussianSpotify.Contracts.Requests.Author.GetAuthor;

/// <summary>
/// Реквест на получение информации об авторе
/// </summary>
public class GetAuthorRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">GetAuthorRequest который приходит с фронта</param>
    public GetAuthorRequest(GetAuthorRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        Name = request.Name;
    }
    
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public GetAuthorRequest()
    {
    }
    
    /// <summary>
    /// Имя автора
    /// </summary>
    public string Name { get; set; }
}