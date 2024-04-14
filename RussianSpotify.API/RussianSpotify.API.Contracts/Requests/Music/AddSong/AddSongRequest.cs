namespace RussianSpotify.Contracts.Requests.Music.AddSong;

/// <summary>
/// Запрос на добавление песни
/// </summary>
public class AddSongRequest
{
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public AddSongRequest()
    {
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    protected AddSongRequest(AddSongRequest request)
    {
        SongName = request.SongName;
        Duration = request.Duration;
        Category = request.Category;
        ImageId = request.ImageId;
        SongFileId = request.SongFileId;
    }

    /// <summary>
    /// Название песни
    /// </summary>
    public string SongName { get; set; } = null!;

    /// <summary>
    /// Длительность песни в секундах
    /// </summary>
    public double Duration { get; set; }

    /// <summary>
    /// Номер категории
    /// </summary>
    public int Category { get; set; }

    /// <summary>
    /// Id картинки
    /// </summary>
    public Guid? ImageId { get; set; }

    /// <summary>
    /// Id файла песни
    /// </summary>
    public Guid? SongFileId { get; set; }
}