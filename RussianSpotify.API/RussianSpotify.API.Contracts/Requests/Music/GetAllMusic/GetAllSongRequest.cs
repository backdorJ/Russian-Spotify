using RussianSpotify.Contracts.Models;

namespace RussianSpotify.Contracts.Requests.Music.GetAllMusic;

/// <summary>
/// Запрос на получение всей музыки
/// </summary>
public class GetAllSongRequest
{
    private int _pageSize;
    private int _pageNumber;

    /// <summary>
    /// Конструктор
    /// </summary>
    public GetAllSongRequest()
    {
        _pageNumber = DefaultsPagination.PageNumber;
        _pageSize = DefaultsPagination.PageSize;
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public GetAllSongRequest(GetAllSongRequest request)
    {
        PageNumber = request.PageNumber;
        PageSize = request.PageSize;
    }

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