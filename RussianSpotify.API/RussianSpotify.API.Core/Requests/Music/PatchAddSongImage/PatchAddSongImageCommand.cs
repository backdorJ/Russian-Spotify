using MediatR;
using RussianSpotify.Contracts.Requests.Music.AddSongImage;

namespace RussianSpotify.API.Core.Requests.Music.PatchAddSongImageCommand;

public class PatchAddSongImageCommand : AddSongImageRequest, IRequest
{
    public PatchAddSongImageCommand(AddSongImageRequest request) : base(request)
    {
    }
}