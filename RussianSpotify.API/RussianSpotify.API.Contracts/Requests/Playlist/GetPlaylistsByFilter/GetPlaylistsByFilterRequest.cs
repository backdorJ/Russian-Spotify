using RussianSpotify.Contracts.Models;

namespace RussianSpotify.Contracts.Requests.Playlist.GetPlaylistsByFilter;

public class GetPlaylistsByFilterRequest : IPaginationFilter
{
    private readonly int _pageSize;
    private readonly int _pageNumber;

    /// <summary>
    /// Конструктор
    /// </summary>
    public GetPlaylistsByFilterRequest()
    {
        _pageNumber = DefaultsPagination.PageNumber;
        _pageSize = DefaultsPagination.PageSize;
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    protected GetPlaylistsByFilterRequest(GetPlaylistsByFilterRequest request)
    {
        PageNumber = request.PageNumber;
        PageSize = request.PageSize;
        FilterName = request.FilterName;
        FilterValue = request.FilterValue;
    }

    /// <summary>
    /// Название фильтра(Доступные фильтры: AuthorPlaylists)
    /// </summary>
    public string FilterName { get; set; }

    /// <summary>
    /// Значение фильтра
    /// </summary>
    public string FilterValue { get; set; }

    /// <summary>
    /// Номер страницы
    /// </summary>
    public int PageNumber
    {
        get => _pageNumber;
        private init => _pageNumber = value > 0 ? value : DefaultsPagination.PageNumber;
    }

    /// <summary>
    /// Кол-во элементов на странице
    /// </summary>
    public int PageSize
    {
        get => _pageSize;
        private init => _pageSize = value > 0 ? value : DefaultsPagination.PageSize;
    }
}