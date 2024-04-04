using MediatR;
using RussianSpotify.Contracts.Requests.Music.AddSongAuthor;

namespace RussianSpotify.API.Core.Requests.Music.PatchAddSongAuthor;

public class PatchAddSongAuthorCommand : AddSongAuthorRequest, IRequest
{
    public PatchAddSongAuthorCommand(AddSongAuthorRequest request) : base(request)
    {
    }
}