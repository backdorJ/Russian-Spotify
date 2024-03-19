namespace RussianSpotify.Data.S3;

/// <summary>
/// Настройки для AWS S3
/// </summary>
public class S3Options
{
    /// <summary>
    /// Логин
    /// </summary>
    public string AccessKey { get; set; } = default!;

    /// <summary>
    /// Секрет
    /// </summary>
    public string SecretKey { get; set; } = default!;

    /// <summary>
    /// Url хранилища
    /// </summary>
    public string ServiceUrl { get; set; } = default!;

    /// <summary>
    /// Название бакета
    /// </summary>
    public string BucketName { get; set; } = default!;

    /// <summary>
    /// Игнорировать проблемы с сертификатом
    /// </summary>
    public bool IsIgnoreCertificateErrors { get; set; } = true;

    /// <summary>
    /// Таймаут
    /// </summary>
    public TimeSpan TimeOut { get; set; } = TimeSpan.FromMinutes(3);
}