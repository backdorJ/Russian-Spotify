using RussianSpotify.Contracts.Models;

namespace RussianSpotify.Contracts.Requests.Playlist.GetAllFavouriteAlbumAndPlaylist;

/// <summary>
/// Запрос на получение любимых плейлистов/альбомов
/// </summary>
public class GetAllFavouriteAlbumAndPlaylistRequest
{
    private int _pageNumber;
    private int _pageSize;

    public GetAllFavouriteAlbumAndPlaylistRequest()
    {
        _pageNumber = DefaultsPagination.PageNumber;
        _pageSize = DefaultsPagination.PageSize;
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public GetAllFavouriteAlbumAndPlaylistRequest(GetAllFavouriteAlbumAndPlaylistRequest request)
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