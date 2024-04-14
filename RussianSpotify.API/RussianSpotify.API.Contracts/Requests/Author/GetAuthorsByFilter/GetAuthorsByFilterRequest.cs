using RussianSpotify.Contracts.Models;

namespace RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

public class GetAuthorsByFilterRequest
{
    private int _pageNumber;
    private int _pageSize;

    public GetAuthorsByFilterRequest()
    {
        _pageNumber = DefaultsPagination.PageNumber;
        _pageSize = DefaultsPagination.PageSize;
    }

    public GetAuthorsByFilterRequest(GetAuthorsByFilterRequest request)
    {
        FilterName = request.FilterName;
        FilterValue = request.FilterValue;
        PlaylistCount = request.PlaylistCount;
        _pageNumber = request.PageNumber;
        _pageSize = request.PageSize;
    }

    /// <summary>
    /// Название фильтра(Доступные фильтры: AuthorPlaylists)
    /// </summary>
    public string FilterName { get; set; } = null!;

    /// <summary>
    /// Значение фильтра
    /// </summary>
    public string FilterValue { get; set; } = null!;

    public int PlaylistCount { get; set; }

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