using MediatR;
using RussianSpotify.Contracts.Requests.Music.PostCreatePlaylist;

namespace RussianSpotify.API.Core.Requests.Music.PostCreatePlaylist;

/// <summary>
/// Команда на создание плейлиста/альбома
/// </summary>
public class PostCreatePlaylistCommand : PostCreatePlaylistRequest, IRequest
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public PostCreatePlaylistCommand(PostCreatePlaylistRequest request)
        : base(request)
    {
    }
}