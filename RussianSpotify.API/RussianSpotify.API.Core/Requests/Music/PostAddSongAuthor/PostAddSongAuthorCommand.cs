using MediatR;
using RussianSpotify.Contracts.Requests.Music.AddSongAuthor;

namespace RussianSpotify.API.Core.Requests.Music.PostAddSongAuthor;

/// <summary>
/// Запрос на добавление автора песни
/// </summary>
public class PostAddSongAuthorCommand : AddSongAuthorRequest, IRequest<AddSongAuthorResponse>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public PostAddSongAuthorCommand(AddSongAuthorRequest request) : base(request)
    {
    }
}