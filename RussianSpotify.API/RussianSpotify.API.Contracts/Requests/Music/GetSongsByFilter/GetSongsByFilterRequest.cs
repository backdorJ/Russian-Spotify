using RussianSpotify.Contracts.Requests.Music.GetAllMusic;

namespace RussianSpotify.Contracts.Requests.Music.GetSongsByFilter;

/// <summary>
/// Запрос на получение песни по фильтру
/// </summary>
public class GetSongsByFilterRequest : GetAllSongRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">GetSongsByFilterRequest, который приходит с фронта</param>
    public GetSongsByFilterRequest(GetSongsByFilterRequest request) : base(request)
    {
        FilterName = request.FilterName;
        FilterValue = request.FilterValue;
    }
    
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public GetSongsByFilterRequest()
    {
    }

    /// <summary>
    /// Название фильтра
    /// </summary>
    public string FilterName { get; set; } = default!;

    /// <summary>
    /// Значение фильтра
    /// </summary>
    public string FilterValue { get; set; } = default!;
}