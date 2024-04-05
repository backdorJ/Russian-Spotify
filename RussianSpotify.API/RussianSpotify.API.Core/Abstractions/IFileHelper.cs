using RussianSpotify.API.Core.Exceptions.FileException;
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
}