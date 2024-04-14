using MediatR;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Music.GetAllFavouriteAlbumAndPlaylist;
using RussianSpotify.API.Core.Requests.Music.GetFavouritePlaylistById;
using RussianSpotify.API.Core.Requests.Music.PostAddPlaylistToFavourite;
using RussianSpotify.API.Core.Requests.Music.PostCreatePlaylist;
using RussianSpotify.API.Core.Requests.Music.PutPlaylist;
using RussianSpotify.Contracts.Requests.Music.GetAllFavouriteAlbumAndPlaylist;
using RussianSpotify.Contracts.Requests.Music.GetFavouritePlaylistById;
using RussianSpotify.Contracts.Requests.Music.PostCreatePlaylist;
using RussianSpotify.Contracts.Requests.Music.PutPlaylist;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер, отвечающий за работу с плейлистами
/// </summary>
public class PlaylistController : ControllerBase
{
    private readonly IMediator _mediator;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="mediator">Медиатор</param>
    public PlaylistController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Создать плейлист/альбом
    /// </summary>
    /// <param name="request">Запрос</param>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpPost("CreatePlaylist")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task PostCreatePlaylistAsync(
        [FromBody] PostCreatePlaylistRequest request,
        CancellationToken cancellationToken)
        => await _mediator.Send(new PostCreatePlaylistCommand(request), cancellationToken);

    /// <summary>
    /// Добавить альбом/плейлист в любимое
    /// </summary>
    /// <param name="id">ИД альбома/плейлиста</param>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpPost("Playlist/{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task PostAddPlaylistToFavouriteAsync(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
        => await _mediator.Send(new PostAddPlaylistToFavouriteCommand(id), cancellationToken);
    
    /// <summary>
    /// Изменить плейлист/альбом
    /// </summary>
    /// <param name="playlistId">ИД плейлиста</param>
    /// <param name="request">Запрос</param>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpPut("EditPlaylist/{playlistId}")]
    public async Task PutPlaylistAsync(
        [FromRoute] Guid playlistId,
        [FromBody] PutPlaylistRequest request, CancellationToken cancellationToken)
        => await _mediator.Send(new PutPlaylistCommand(
                request: request,
                playlistId: playlistId),
            cancellationToken);

    /// <summary>
    /// Поулчить все любимые плейлисты/альбомы
    /// </summary>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Запрос на получение любимых альбомов/песен</returns>
    [HttpGet("AllFavouritePlaylists")]
    public async Task<GetAllFavouriteAlbumAndPlaylistResponse> GetAllFavouritePlaylistsAsync(
        CancellationToken cancellationToken)
        => await _mediator.Send(new GetAllFavouriteAlbumAndPlaylistQuery(), cancellationToken);

    /// <summary>
    /// Получить инфу о плейлисте/альбоме
    /// </summary>
    /// <param name="playlistId">ИД плейлиста/альбома</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Плейлист/альбом</returns>
    [HttpGet("FavouritePlaylist/{playlistId}")]
    public async Task<GetFavouritePlaylistByIdResponse> GetFavouritePlaylistAsync(
        [FromRoute] Guid playlistId,
        CancellationToken cancellationToken)
        => await _mediator.Send(new GetFavouritePlaylistByIdQuery(playlistId: playlistId), cancellationToken);
}