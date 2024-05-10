using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetSongContentById;

namespace RussianSpotify.API.Core.Requests.Music.GetSongContentById;

/// <summary>
/// Запрос на получение стрима музыки
/// </summary>
public class GetSongContentByIdQuery : IRequest<GetSongContentByIdResponse>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="id">ИД музыки</param>
    public GetSongContentByIdQuery(Guid id)
        => Id = id;

    /// <summary>
    /// ИД музыки
    /// </summary>
    public Guid Id { get; set; }
}