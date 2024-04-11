using RussianSpotify.Contracts.Models;

namespace RussianSpotify.Contracts.Requests.Music.GetAllFavouriteSongs;

/// <summary>
/// Запрос на получение всех любимых песен
/// </summary>
public class GetAllFavouriteSongsRequest
{
    private int _pageNumber;
    private int _pageSize;

    public GetAllFavouriteSongsRequest()
    {
        _pageNumber = DefaultsPagination.PageNumber;
        _pageSize = DefaultsPagination.PageSize;
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public GetAllFavouriteSongsRequest(GetAllFavouriteSongsRequest request)
    {
        PageNumber = request.PageNumber;
        PageSize = request.PageSize;
    }

    /// <summary>
    /// Размер страницы
    /// </summary>
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > 0 ? value : DefaultsPagination.PageSize;
    }

    /// <summary>
    /// Номер страницы
    /// </summary>
    public int PageNumber
    {
        get => _pageNumber;
        set => _pageNumber = value > 0 ? value : DefaultsPagination.PageNumber;
    }
}