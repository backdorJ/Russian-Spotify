using MediatR;
using RussianSpotify.Contracts.Requests.Music.AddSong;

namespace RussianSpotify.API.Core.Requests.Music.PostAddSong;

/// <summary>
/// Запрос на добавление песни
/// </summary>
public class PostAddSongCommand : AddSongRequest, IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public PostAddSongCommand(AddSongRequest request) : base(request)
    {
    }
}