using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Music.DeleteSong;
using RussianSpotify.API.Core.Requests.Music.DeleteSongAuthor;
using RussianSpotify.API.Core.Requests.Music.DeleteSongFromBucket;
using RussianSpotify.API.Core.Requests.Music.GetCategories;
using RussianSpotify.API.Core.Requests.Music.GetSongByFilter;
using RussianSpotify.API.Core.Requests.Music.GetSongContentById;
using RussianSpotify.API.Core.Requests.Music.PatchEditSong;
using RussianSpotify.API.Core.Requests.Music.PostAddSong;
using RussianSpotify.API.Core.Requests.Music.PostAddSongAuthor;
using RussianSpotify.API.Core.Requests.Music.PostAddSongToFavourite;
using RussianSpotify.Contracts.Requests.Music.AddSong;
using RussianSpotify.Contracts.Requests.Music.AddSongAuthor;
using RussianSpotify.Contracts.Requests.Music.DeleteSong;
using RussianSpotify.Contracts.Requests.Music.DeleteSongAuthor;
using RussianSpotify.Contracts.Requests.Music.EditSong;
using RussianSpotify.Contracts.Requests.Music.GetCategories;
using RussianSpotify.Contracts.Requests.Music.GetSongsByFilter;

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
    /// Получить музыку по фильтру(Доступные фильтры: AuthorSongs, SongName, FavoriteSongs, SongsInPlaylist)
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
    public async Task<AddSongResponse> AddSongAsync([FromBody] AddSongRequest addSongRequest,
        CancellationToken cancellationToken)
    {
        var command = new PostAddSongCommand(addSongRequest);
        return await _mediator.Send(command, cancellationToken);
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
    [HttpPost]
    [Route("AddSongAuthor")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task<AddSongAuthorResponse> AddSongAuthorAsync([FromBody] AddSongAuthorRequest addSongAuthorRequest,
        CancellationToken cancellationToken)
    {
        var command = new PostAddSongAuthorCommand(addSongAuthorRequest);
        return await _mediator.Send(command, cancellationToken);
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
    public async Task<EditSongResponse> UpdateSongAsync([FromBody] EditSongRequest editSongRequest,
        CancellationToken cancellationToken)
    {
        var command = new PatchEditSongCommand(editSongRequest);
        var result = await _mediator.Send(command, cancellationToken);

        return result;
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
    public async Task<DeleteSongAuthorResponse> RemoveAuthor(
        [FromQuery] DeleteSongAuthorRequest deleteSongAuthorRequest,
        CancellationToken cancellationToken)
    {
        var command = new DeleteSongAuthorCommand(deleteSongAuthorRequest);
        return await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Удалить песню
    /// </summary>
    /// <param name="songId">Id песни</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Все хорошо</response>
    /// <response code="400">Ошибка в запросе</response>
    /// <response code="403">Не автор или не является автором данной песни</response>
    /// <response code="500">Внутрення ошибка сервера</response>
    [HttpDelete]
    [Route("DeleteSong/{songId:guid}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task<DeleteSongResponse> DeleteSong(Guid songId, CancellationToken cancellationToken)
    {
        var command = new DeleteSongCommand(new DeleteSongRequest
        {
            SongId = songId
        });
        
        return await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Добавить песню в любимое
    /// </summary>
    /// <param name="songId"></param>
    /// <param name="cancellationToken"></param>
    [HttpPost("SongFavourite/{songId:guid}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task PostAddSongToFavouriteAsync(
        [FromRoute] Guid songId,
        CancellationToken cancellationToken)
        => await _mediator.Send(new PostAddSongToFavouriteCommand(songId), cancellationToken);

    /// <summary>
    /// Удалить песню из бакета
    /// </summary>
    /// <param name="songId">ИД песни</param>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpDelete("RemoveSongFromBucket/{songId:guid}")]
    public async Task DeleteSongFromBucketAsync([FromRoute] Guid songId, CancellationToken cancellationToken)
        => await _mediator.Send(new DeleteSongFromBucketCommand(songId), cancellationToken);

    /// <summary>
    /// Возвращает все категории(жанры) песен
    /// </summary>
    [HttpGet("GetCategories")]
    public async Task<GetCategoriesResponse> GetCategoriesAsync()
    {
        var query = new GetCategoriesQuery();
        var response = await _mediator.Send(query);

        return response;
    }
}