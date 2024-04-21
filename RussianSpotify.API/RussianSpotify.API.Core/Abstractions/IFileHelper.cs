using RussianSpotify.API.Core.Exceptions.FileExceptions;
using File = RussianSpotify.API.Core.Entities.File;

namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Сервис-помощник для работы с файлами
/// </summary>
public interface IFileHelper
{
    /// <summary>
    /// Является ли данный файл картинкой (Image)
    /// </summary>
    /// <param name="file">Файл для проверки</param>
    /// <returns>Результат проверки</returns>
    /// <exception cref="FileInternalException">У файла не указан ContentType</exception>
    bool IsImage(File file);

    /// <summary>
    /// Является ли данный файл музыкой (Audio)
    /// </summary>
    /// <param name="file">Файл для проверки</param>
    /// <returns>Результат проверки</returns>
    /// <exception cref="FileInternalException">У файла не указан ContentType</exception>
    bool IsAudio(File file);

    /// <summary>
    /// Удалить файл из бд и из хранилища
    /// </summary>
    /// <param name="file">Файл для удаления</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns></returns>
    Task DeleteFileAsync(File file, CancellationToken cancellationToken);
}