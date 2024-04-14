using RussianSpotify.Contracts.Models;

namespace RussianSpotify.Contracts.Requests.Music.GetPlaylistsAndAlbums;

/// <summary>
/// Запрос на получение любимых плейлистов/альбомов
/// </summary>
public class GetPlaylistsAndAlbumsRequest
{
    private int _pageNumber;
    private int _pageSize;

    public GetPlaylistsAndAlbumsRequest()
    {
        _pageNumber = DefaultsPagination.PageNumber;
        _pageSize = DefaultsPagination.PageSize;
        IsFavourite = false;
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public GetPlaylistsAndAlbumsRequest(GetPlaylistsAndAlbumsRequest request)
    {
        PageNumber = request.PageNumber;
        PageSize = request.PageSize;
        IsFavourite = request.IsFavourite;
    }

    /// <summary>
    /// Любимые
    /// </summary>
    public bool IsFavourite { get; set; }

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