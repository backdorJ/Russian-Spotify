using MediatR;
using RussianSpotify.Contracts.Requests.Music.AddSongAuthor;

namespace RussianSpotify.API.Core.Requests.Music.PatchAddSongAuthor;

/// <summary>
/// Запрос на добавление автора песни
/// </summary>
public class PatchAddSongAuthorCommand : AddSongAuthorRequest, IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public PatchAddSongAuthorCommand(AddSongAuthorRequest request) : base(request)
    {
    }
}