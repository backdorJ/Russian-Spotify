namespace RussianSpotify.Contracts.Requests.Music.GetSongInfoById;

/// <summary>
/// Ответ на запрос о получении подробной информации о песне
/// </summary>
public class GetSongInfoByIdResponse
{
    /// <summary>
    /// ИД песни
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Название песни
    /// </summary>
    public string? SongName { get; set; }

    /// <summary>
    /// Длительность
    /// </summary>
    public double? Duration { get; set; }

    /// <summary>
    /// Авторы
    /// </summary>
    public List<string?> Authors { get; set; }

    /// <summary>
    /// Категория
    /// </summary>
    public string? Category { get; set; }

    /// <summary>
    /// ИД картинки
    /// </summary>
    public Guid? ImageId { get; set; }

    /// <summary>
    /// Есть ли данный трек в любимых
    /// </summary>
    public bool IsHave { get; set; }
}