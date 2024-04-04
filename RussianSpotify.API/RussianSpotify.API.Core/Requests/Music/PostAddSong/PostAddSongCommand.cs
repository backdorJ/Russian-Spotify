using MediatR;
using RussianSpotify.Contracts.Requests.Music.AddSong;

namespace RussianSpotify.API.Core.Requests.Music.PostAddSong;

public class PostAddSongCommand : AddSongRequest, IRequest
{
    public PostAddSongCommand(AddSongRequest request) : base(request)
    {
    }
}