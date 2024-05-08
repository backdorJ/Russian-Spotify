using MediatR;
using RussianSpotify.Contracts.Requests.Music.EditSong;

namespace RussianSpotify.API.Core.Requests.Music.PatchEditSong;

/// <summary>
/// Команда на обновление данных о песне
/// </summary>
public class PatchEditSongCommand : EditSongRequest, IRequest<EditSongResponse>
{
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="request">Request with info</param>
    public PatchEditSongCommand(EditSongRequest request) : base(request)
    {
    }
}