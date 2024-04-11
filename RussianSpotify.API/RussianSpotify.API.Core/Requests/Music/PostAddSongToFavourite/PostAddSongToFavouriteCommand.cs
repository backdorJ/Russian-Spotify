using MediatR;

namespace RussianSpotify.API.Core.Requests.Music.PostAddSongToFavourite;

/// <summary>
/// Команда на добавление музыки в любимое
/// </summary>
public class PostAddSongToFavouriteCommand : IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="songId">ИД песни</param>
    public PostAddSongToFavouriteCommand(Guid songId)
        => SongId = songId;
    
    /// <summary>
    /// ИД песни
    /// </summary>
    public Guid SongId { get; set; }
}