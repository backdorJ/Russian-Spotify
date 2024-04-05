using MediatR;
using RussianSpotify.Contracts.Requests.Music.EditSong;

namespace RussianSpotify.API.Core.Requests.Music.PatchEditSong;

public class PatchEditSongCommand : EditSongRequest, IRequest
{
    public PatchEditSongCommand(EditSongRequest request) : base(request)
    {
    }
}