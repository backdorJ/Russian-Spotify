namespace RussianSpotify.Contracts.Requests.Music.EditSong;

/// <summary>
/// Запрос на обновление песни
/// </summary>
public class EditSongRequest
{
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public EditSongRequest()
    {
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    protected EditSongRequest(EditSongRequest request)
    {
        SongId = request.SongId;
        SongName = request.SongName;
        Category = request.Category;
        Duration = request.Duration;
        ImageId = request.ImageId;
        SongFileId = request.SongFileId;
    }

    /// <summary>
    /// Id песни
    /// </summary>
    public Guid SongId { get; set; }

    /// <summary>
    /// Новое название песни
    /// </summary>
    public string? SongName { get; set; }

    /// <summary>
    /// Навый номер категории
    /// </summary>
    public int? Category { get; set; }

    /// <summary>
    /// Новая продолжительность
    /// </summary>
    public double? Duration { get; set; }

    /// <summary>
    /// Id новой картинки
    /// </summary>
    public Guid? ImageId { get; set; }

    /// <summary>
    /// Id нового файла
    /// </summary>
    public Guid? SongFileId { get; set; }
}