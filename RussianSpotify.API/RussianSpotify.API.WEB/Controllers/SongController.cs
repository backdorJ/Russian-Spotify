using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Music.DeleteSong;
using RussianSpotify.API.Core.Requests.Music.DeleteSongAuthor;
using RussianSpotify.API.Core.Requests.Music.GetAllFavouriteAlbumAndPlaylist;
using RussianSpotify.API.Core.Requests.Music.GetAllFavouriteSongs;
using RussianSpotify.API.Core.Requests.Music.GetAllMusic;
using RussianSpotify.API.Core.Requests.Music.GetFavouritePlaylistById;
using RussianSpotify.API.Core.Requests.Music.GetPlaylistsByFilter;
using RussianSpotify.API.Core.Requests.Music.GetSongByFilter;
using RussianSpotify.API.Core.Requests.Music.GetSongContentById;
using RussianSpotify.API.Core.Requests.Music.PatchAddSongAuthor;
using RussianSpotify.API.Core.Requests.Music.PatchEditSong;
using RussianSpotify.API.Core.Requests.Music.PostAddPlaylistToFavourite;
using RussianSpotify.API.Core.Requests.Music.PostAddSong;
using RussianSpotify.API.Core.Requests.Music.PostAddSongToFavourite;
using RussianSpotify.API.Core.Requests.Music.PostCreatePlaylist;
using RussianSpotify.API.Core.Requests.Music.PutPlaylist;
using RussianSpotify.Contracts.Requests.Music.AddSong;
using RussianSpotify.Contracts.Requests.Music.AddSongAuthor;
using RussianSpotify.Contracts.Requests.Music.DeleteSong;
using RussianSpotify.Contracts.Requests.Music.DeleteSongAuthor;
using RussianSpotify.Contracts.Requests.Music.EditSong;
using RussianSpotify.Contracts.Requests.Music.GetAllFavouriteAlbumAndPlaylist;
using RussianSpotify.Contracts.Requests.Music.GetAllFavouriteSongs;
using RussianSpotify.Contracts.Requests.Music.GetAllMusic;
using RussianSpotify.Contracts.Requests.Music.GetFavouritePlaylistById;
using RussianSpotify.Contracts.Requests.Music.GetPlaylistsByFilter;
using RussianSpotify.Contracts.Requests.Music.GetSongsByFilter;
using RussianSpotify.Contracts.Requests.Music.PostCreatePlaylist;
using RussianSpotify.Contracts.Requests.Music.PutPlaylist;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер, который отвечает за работу с музыкой
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SongController : FileBaseController
{
    private readonly IMediator _mediator;

    /// <summary>
    /// Коснтруктор
    /// </summary>
    /// <param name="mediator">Медиатор CQRS</param>
    public SongController(IMediator mediator)
        => _mediator = mediator;

    /// <summary>
    /// Получить всю музыку по странично
    /// </summary>
    /// <param name="request">Запрос</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Музыка</returns>
    [HttpGet]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public async Task<GetAllSongResponse> GetAllSongsAsync(
        [FromQuery] GetAllSongRequest request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        return await _mediator.Send(
            new GetAllSongQuery(request),
            cancellationToken);
    }

    /// <summary>
    /// Получить музыку по фильтру(Доступные фильтры: AuthorSongs)
    /// </summary>
    /// <param name="request">GetSongsByFilterRequest(Название фильтра,
    /// значение фильтра, страница, кол-во песен на странице)</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>GetSongsByFilterResponse песни по фильтру и общее количество песен по этом фильтру</returns>
    [HttpGet("GetSongsByFilter")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<GetSongsByFilterResponse> GetSongsByFilter([FromQuery] GetSongsByFilterRequest request,
        CancellationToken cancellationToken)
    {
        var query = new GetSongsByFilterQuery(request);
        return await _mediator.Send(query, cancellationToken);
    }

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
    
    /// <summary>
    /// Отправить песню в виде стрима
    /// </summary>
    /// <param name="songId">ИД песни</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Стрим песни</returns>
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    [HttpGet("{songId}")]
    [AllowAnonymous]
    public async Task<FileStreamResult> GetContentSongByIdAsync(
        [FromRoute] Guid songId,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(
            new GetSongContentByIdQuery(songId),
            cancellationToken);

        return GetFileStreamResult(
            result,
            Response.Headers,
            inline: false,
            customHeaders: true);
    }

    /// <summary>
    /// Добавить новую песню (информацию)
    /// </summary>
    /// <param name="addSongRequest">Запрос с информацией</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Все хорошо</response>
    /// <response code="400">Ошибка в запросе</response>
    /// <response code="500">Внутрення ошибка сервера</response>
    [HttpPost]
    [Route("AddSong")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task AddSongAsync([FromBody] AddSongRequest addSongRequest, CancellationToken cancellationToken)
    {
        var command = new PostAddSongCommand(addSongRequest);
        await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Добавить автора песни
    /// </summary>
    /// <param name="addSongAuthorRequest">Запрос с информацией</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Все хорошо</response>
    /// <response code="400">Ошибка в запросе</response>
    /// <response code="403">Не автор или не является автором данной песни</response>
    /// <response code="500">Внутрення ошибка сервера</response>
    [HttpPatch]
    [Route("AddSongAuthor")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task AddSongAuthorAsync([FromBody] AddSongAuthorRequest addSongAuthorRequest,
        CancellationToken cancellationToken)
    {
        var command = new PatchAddSongAuthorCommand(addSongAuthorRequest);
        await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Обновить данные о песне
    /// </summary>
    /// <param name="editSongRequest">Запрос с информацией</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Все хорошо</response>
    /// <response code="400">Ошибка в запросе</response>
    /// <response code="403">Не автор или не является автором данной песни</response>
    /// <response code="500">Внутрення ошибка сервера</response>
    [HttpPatch]
    [Route("UpdateSong")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task UpdateSongAsync([FromBody] EditSongRequest editSongRequest, CancellationToken cancellationToken)
    {
        var command = new PatchEditSongCommand(editSongRequest);
        await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Удалить автора песни
    /// </summary>
    /// <param name="deleteSongAuthorRequest">Запрос с информацией</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Все хорошо</response>
    /// <response code="400">Ошибка в запросе</response>
    /// <response code="403">Не автор или не является автором данной песни</response>
    /// <response code="500">Внутрення ошибка сервера</response>
    [HttpDelete]
    [Route("RemoveAuthor")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task RemoveAuthor([FromBody] DeleteSongAuthorRequest deleteSongAuthorRequest,
        CancellationToken cancellationToken)
    {
        var command = new DeleteSongAuthorCommand(deleteSongAuthorRequest);
        await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Удалить песню
    /// </summary>
    /// <param name="deleteSongRequest">Запрос с информацией</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Все хорошо</response>
    /// <response code="400">Ошибка в запросе</response>
    /// <response code="403">Не автор или не является автором данной песни</response>
    /// <response code="500">Внутрення ошибка сервера</response>
    [HttpDelete]
    [Route("DeleteSong")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task DeleteSong([FromBody] DeleteSongRequest deleteSongRequest, CancellationToken cancellationToken)
    {
        var command = new DeleteSongCommand(deleteSongRequest);
        await _mediator.Send(command, cancellationToken);
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
    /// Добавить песню в любимое
    /// </summary>
    /// <param name="songId"></param>
    /// <param name="cancellationToken"></param>
    [HttpPost("SongFavourite/{songId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task PostAddSongToFavouriteAsync(
        [FromRoute] Guid songId,
        CancellationToken cancellationToken)
        => await _mediator.Send(new PostAddSongToFavouriteCommand(songId), cancellationToken);

    /// <summary>
    /// Получить все любимые песни
    /// </summary>
    /// <param name="request">Запрос</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Любимые песни</returns>
    [HttpGet("FavouriteSongs")]
    public async Task<List<GetAllFavouriteSongsResponse>> GetAllFavouriteSongsAsync(
        [FromQuery] GetAllFavouriteSongsRequest request,
        CancellationToken cancellationToken)
        => await _mediator.Send(new GetAllFavouriteSongsQuery(request), cancellationToken);

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
    public async Task<List<GetAllFavouriteAlbumAndPlaylistResponse>> GetAllFavouritePlaylists(
        CancellationToken cancellationToken)
        => await _mediator.Send(new GetAllFavouriteAlbumAndPlaylistQuery(), cancellationToken);

    /// <summary>
    /// Получить инфу об плейлиста/альбома
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