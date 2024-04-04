using MediatR;
using RussianSpotify.Contracts.Requests.Music.AddSongImage;

namespace RussianSpotify.API.Core.Requests.Music.PatchAddSongImage;

/// <summary>
/// Запрос на добавление картинки песни
/// </summary>
public class PatchAddSongImageCommand : AddSongImageRequest, IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public PatchAddSongImageCommand(AddSongImageRequest request) : base(request)
    {
    }
}