namespace RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

/// <summary>
/// Сущность плейлиста для <see cref="GetAuthorsByFilterResponseItem"/>
/// </summary>
public class GetAuthorsByFilterResponseItemPlaylist
{
    /// <summary>
    /// Id альбома
    /// </summary>
    public Guid PlaylistId { get; set; }
    
    /// <summary>
    /// Название альбома
    /// </summary>
    public string PlaylistName { get; set; } = null!;
}