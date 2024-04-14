using MediatR;
using RussianSpotify.Contracts.Requests.Music.DeleteSong;
using RussianSpotify.Contracts.Requests.Music.DeleteSongAuthor;

namespace RussianSpotify.API.Core.Requests.Music.DeleteSongAuthor;

/// <summary>
/// Команда на удаление автора песни
/// </summary>
public class DeleteSongAuthorCommand : DeleteSongAuthorRequest, IRequest
{
    public DeleteSongAuthorCommand(DeleteSongAuthorRequest request) : base(request)
    {
    }
}