using MediatR;
using RussianSpotify.Contracts.Requests.Music.GetSongInfoById;

namespace RussianSpotify.API.Core.Requests.Music.GetSongInfoById;

/// <summary>
/// Запрос на получение подробной информации о музыке
/// </summary>
public class GetSongInfoByIdQuery : IRequest<GetSongInfoByIdResponse>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="songId">ИД песни</param>
    public GetSongInfoByIdQuery(Guid songId)
        => SongId = songId;
    
    /// <summary>
    /// ИД песни
    /// </summary>
    public Guid SongId { get; set; }
}