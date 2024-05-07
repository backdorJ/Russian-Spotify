using MediatR;
using RussianSpotify.Contracts.Requests.Music.EditSong;

namespace RussianSpotify.API.Core.Requests.Music.PatchEditSong;

/// <summary>
/// Команда на обновление данных о песне
/// </summary>
public class PatchEditSongCommand : EditSongRequest, IRequest<EditSongResponse>
{
    public PatchEditSongCommand(EditSongRequest request) : base(request)
    {
    }
}