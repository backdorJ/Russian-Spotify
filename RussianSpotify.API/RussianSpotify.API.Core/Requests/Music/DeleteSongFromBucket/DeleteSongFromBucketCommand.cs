using MediatR;

namespace RussianSpotify.API.Core.Requests.Music.DeleteSongFromBucket;

/// <summary>
/// Команда на удаление песни из любимых
/// </summary>
public class DeleteSongFromBucketCommand : IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="songId">ИД песни</param>
    public DeleteSongFromBucketCommand(Guid songId)
        => SongId = songId;

    /// <summary>
    /// ИД песни
    /// </summary>
    public Guid SongId { get; set; }
}