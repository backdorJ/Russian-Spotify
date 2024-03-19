using RussianSpotify.API.Core.Models;

namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Сервис S3
/// </summary>
public interface IS3Service
{
    /// <summary>
    /// Загрузить файл в хранилище
    /// </summary>
    /// <param name="fileContent">Бинарные данные</param>
    /// <param name="needAutoCloseStream">Нужно ли закрывать поток после загрузки</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns></returns>
    Task<string> UploadAsync(
        FileContent fileContent,
        bool needAutoCloseStream = true,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Скачать файл по ключу
    /// </summary>
    /// <param name="key">Ключе</param>
    /// <param name="bucket">Бакет если отличется от умолчания</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Файл</returns>
    Task<FileContent?> DownloadFileAsync(
        string key,
        string? bucket = default,
        CancellationToken cancellationToken = default);
}