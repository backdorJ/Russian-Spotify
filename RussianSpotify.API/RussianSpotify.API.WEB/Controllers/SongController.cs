using System.Net.Http.Headers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Music.DeleteSong;
using RussianSpotify.API.Core.Requests.Music.DeleteSongAuthor;
using RussianSpotify.API.Core.Requests.Music.GetAllMusic;
using RussianSpotify.API.Core.Requests.Music.GetSongContentById;
using RussianSpotify.API.Core.Requests.Music.PatchAddSongAuthor;
using RussianSpotify.API.Core.Requests.Music.PatchEditSong;
using RussianSpotify.API.Core.Requests.Music.PostAddSong;
using RussianSpotify.Contracts.Requests.Music.AddSong;
using RussianSpotify.Contracts.Requests.Music.AddSongAuthor;
using RussianSpotify.Contracts.Requests.Music.DeleteSong;
using RussianSpotify.Contracts.Requests.Music.DeleteSongAuthor;
using RussianSpotify.Contracts.Requests.Music.EditSong;
using RussianSpotify.Contracts.Requests.Music.GetAllMusic;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер, который отвечает за работу с музыкой
/// </summary>
[ApiController]
[Route("api/[controller]")]
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
    [Authorize]
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

        Response.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment").ToString();
        Response.ContentLength = result.Content.Length;
        Response.Headers.AcceptRanges = "bytes";
        Response.Headers.CacheControl = "max-age=14400";
        
        return new FileStreamResult(result.Content, result.ContentType);
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
}