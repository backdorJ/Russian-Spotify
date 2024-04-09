using MediatR;
using RussianSpotify.Contracts.Requests.Music.DeleteSong;

namespace RussianSpotify.API.Core.Requests.Music.DeleteSong;

/// <summary>
/// Команда на удаление песни
/// </summary>
public class DeleteSongCommand : DeleteSongRequest, IRequest
{
    public DeleteSongCommand(DeleteSongRequest request) : base(request)
    {
    }
}