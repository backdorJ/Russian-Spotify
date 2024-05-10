using RussianSpotify.Contracts.Models;

namespace RussianSpotify.Contracts.Requests.Music.GetSongsByFilter;

/// <summary>
/// Запрос на получение песни по фильтру
/// </summary>
public class GetSongsByFilterRequest
{
    private int _pageSize;
    private int _pageNumber;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">GetSongsByFilterRequest, который приходит с фронта</param>
    public GetSongsByFilterRequest(GetSongsByFilterRequest request)
    {
        FilterName = request.FilterName;
        FilterValue = request.FilterValue;
        PageNumber = request.PageNumber;
        PageSize = request.PageSize;
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

    /// <summary>
    /// Номер страницы
    /// </summary>
    public int PageNumber
    {
        get => _pageNumber;
        init => _pageNumber = value > 0 ? value : DefaultsPagination.PageNumber;
    }

    /// <summary>
    /// Кол-во элементов на странице
    /// </summary>
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > 0 ? value : DefaultsPagination.PageSize;
    }
}