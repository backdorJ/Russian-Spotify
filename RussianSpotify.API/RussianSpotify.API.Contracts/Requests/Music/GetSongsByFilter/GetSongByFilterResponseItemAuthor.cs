namespace RussianSpotify.Contracts.Requests.Music.GetSongsByFilter;

/// <summary>
/// Автор для <see cref="GetSongsByFilterResponseItem"/>
/// </summary>
public class GetSongByFilterResponseItemAuthor
{
    /// <summary>
    /// Id автора
    /// </summary>
    public Guid AuthorId { get; set; }

    /// <summary>
    /// Имя автора
    /// </summary>
    public string AuthorName { get; set; } = null!;
}