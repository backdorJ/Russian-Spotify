using MediatR;
using RussianSpotify.Contracts.Requests.Playlist.DeletePlaylist;

namespace RussianSpotify.API.Core.Requests.Playlist.DeletePlaylist;

using Entities;

/// <summary>
/// Команда на удаление <see cref="Playlist"/>
/// </summary>
public class DeletePlaylistCommand : DeletePlaylistRequest, IRequest<DeletePlaylistResponse>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    public DeletePlaylistCommand(DeletePlaylistRequest request) : base(request)
    {
    }
}