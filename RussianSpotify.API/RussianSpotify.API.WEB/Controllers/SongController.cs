using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RussianSpotify.API.Core.Requests.Music.GetAllMusic;
using RussianSpotify.API.Core.Requests.Music.GetSongContentById;
using RussianSpotify.API.Core.Requests.Music.PatchAddSongAuthor;
using RussianSpotify.API.Core.Requests.Music.PatchAddSongImage;
using RussianSpotify.API.Core.Requests.Music.PostAddSong;
using RussianSpotify.Contracts.Requests.Music.AddSong;
using RussianSpotify.Contracts.Requests.Music.AddSongAuthor;
using RussianSpotify.Contracts.Requests.Music.AddSongImage;
using RussianSpotify.Contracts.Requests.Music.GetAllMusic;

namespace RussianSpotify.API.WEB.Controllers;

/// <summary>
/// Контроллер, который отвечает за работу с музыкой
/// </summary>
[Authorize]
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
    public async Task<FileStreamResult> GetContentSongByIdAsync(
        [FromRoute] Guid songId,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(
            new GetSongContentByIdQuery(songId),
            cancellationToken);

        return GetFileStreamResult(
            file: result,
            headers: Response.Headers,
            inline: true);
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
    /// Добавить картинку (существующую в бд) к песне
    /// </summary>
    /// <param name="addSongImageRequest">Запрос с информацией</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Все хорошо</response>
    /// <response code="400">Ошибка в запросе</response>
    /// <response code="500">Внутрення ошибка сервера</response>
    [HttpPatch]
    [Route("AddSongImage")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task AddSongImageAsync([FromBody] AddSongImageRequest addSongImageRequest,
        CancellationToken cancellationToken)
    {
        var command = new PatchAddSongImageCommand(addSongImageRequest);
        await _mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Добавить автора песни
    /// </summary>
    /// <param name="addSongAuthorRequest">Запрос с информацией</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="200">Все хорошо</response>
    /// <response code="400">Ошибка в запросе</response>
    /// <response code="500">Внутрення ошибка сервера</response>
    [HttpPatch]
    [Route("AddSongAuthor")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task AddSongAuthorAsync([FromBody] AddSongAuthorRequest addSongAuthorRequest,
        CancellationToken cancellationToken)
    {
        var command = new PatchAddSongAuthorCommand(addSongAuthorRequest);
        await _mediator.Send(command, cancellationToken);
    }
}