namespace RussianSpotify.Contracts.Requests.Music.GetAllFavouriteSongs;

public class GetAllFavouriteSongsResponse
{
    /// <summary>
    /// ИД песни
    /// </summary>
    public Guid SongId { get; set; }
    
    /// <summary>
    /// Название музыки
    /// </summary>
    public string? SongName { get; set; }

    /// <summary>
    /// ИД картинки
    /// </summary>
    public Guid? ImageId { get; set; }

    /// <summary>
    /// Длительность
    /// </summary>
    public double Duration { get; set; }

    /// <summary>
    /// Категория
    /// </summary>
    public string? Category { get; set; }

    /// <summary>
    /// Авторы
    /// </summary>
    public List<string?> Authors { get; set; }
}