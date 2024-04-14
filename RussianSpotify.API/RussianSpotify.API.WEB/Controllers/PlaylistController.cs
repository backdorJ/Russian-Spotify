using MediatR;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Music.GetPlaylistById;
using RussianSpotify.API.Core.Requests.Music.GetPlaylistsAndAlbums;
using RussianSpotify.API.Core.Requests.Music.GetPlaylistsByFilter;
using RussianSpotify.API.Core.Requests.Music.PostAddPlaylistToFavourite;
using RussianSpotify.API.Core.Requests.Music.PostCreatePlaylist;
using RussianSpotify.API.Core.Requests.Music.PutPlaylist;
using RussianSpotify.Contracts.Requests.Music.GetFavouritePlaylistById;
using RussianSpotify.Contracts.Requests.Music.GetPlaylistsAndAlbums;
using RussianSpotify.Contracts.Requests.Music.GetPlaylistsByFilter;
using RussianSpotify.Contracts.Requests.Music.PostCreatePlaylist;
using RussianSpotify.Contracts.Requests.Music.PutPlaylist;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер, отвечающий за работу с плейлистами
/// </summary>
[ApiController]
[Route("api/[controller]")]
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
    /// <param name="request"></param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Запрос на получение любимых альбомов/песен</returns>
    [HttpGet("GetPlaylists")]
    public async Task<GetPlaylistsAndAlbumsResponse> GetAllFavouritePlaylistsAsync(
        [FromQuery] GetPlaylistsAndAlbumsRequest request,
        CancellationToken cancellationToken)
        => await _mediator.Send(new GetPlaylistsAndAlbumsQuery(request), cancellationToken);

    /// <summary>
    /// Получить инфу о плейлисте/альбоме
    /// </summary>
    /// <param name="playlistId">ИД плейлиста/альбома</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Плейлист/альбом</returns>
    [HttpGet("GetPlaylist/{playlistId}")]
    public async Task<GetFavouritePlaylistByIdResponse> GetFavouritePlaylistAsync(
        [FromRoute] Guid playlistId,
        CancellationToken cancellationToken)
        => await _mediator.Send(new GetPlaylistByIdQuery(playlistId: playlistId), cancellationToken);
    
    /// <summary>
    /// Получить альбомы по фильтру(Доступные фильтры: AuthorPlaylists)
    /// </summary>
    /// <param name="request">GetPlaylistsByFilterRequest(Название фильтра,
    /// значение фильтра, страница, кол-во альбомов на странице)</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Список GetPlaylistsByFilterResponse альбомы по фильтру</returns>
    [HttpGet("GetPlaylistsByFilter")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<GetPlaylistsByFilterResponse>> GetPlaylistsByFilter(
        [FromQuery] GetPlaylistsByFilterRequest request,
        CancellationToken cancellationToken)
    {
        var query = new GetPlaylistsByFilterQuery(request);
        return await _mediator.Send(query, cancellationToken);
    }
}