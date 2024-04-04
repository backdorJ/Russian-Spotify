namespace RussianSpotify.Contracts.Requests.Music.AddSongImage;

/// <summary>
/// Запрос на добавление картинки песни
/// </summary>
public class AddSongImageRequest
{
    /// <summary>
    /// Пустой конструктор
    /// </summary>
    public AddSongImageRequest()
    {
        
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос</param>
    protected AddSongImageRequest(AddSongImageRequest request)
    {
        SongId = request.SongId;
        ImageId = request.ImageId;
    }

    /// <summary>
    /// Id песни
    /// </summary>
    public Guid SongId { get; set; }
    
    /// <summary>
    /// Id картинки
    /// </summary>
    public Guid ImageId { get; set; }
}