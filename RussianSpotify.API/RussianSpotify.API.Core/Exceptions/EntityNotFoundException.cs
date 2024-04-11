using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Models;
using File = System.IO.File;

namespace RussianSpotify.API.Core.Exceptions;

/// <summary>
/// Ошибка на ненайденую сущность
/// </summary>
public class EntityNotFoundException<TEntity> : ApplicationBaseException
    where TEntity : class
{
    private static readonly IDictionary<Type, string> EntityExceptions = new Dictionary<Type, string>
    {
        [typeof(File)] = "Не найдена сущность 'Файл'",
        [typeof(FileContent)] = "Не найден файл в S3 хранилище",
        [typeof(User)] = "Не найден пользователь",
        [typeof(Playlist)] = "Не найден альбом/плейлист",
        [typeof(Song)] = "Не найдена песня",
    };
    
    public EntityNotFoundException(string message)
        : base($"{ExceptionEntity} с адресом {message}")
    {
    }
    
    public EntityNotFoundException(Guid id)
        : base($"{ExceptionEntity} c идентификатором {id}")
    {
    }
    
    private static string? ExceptionEntity => EntityExceptions.TryGetValue(typeof(TEntity), out var text)
        ? text
        : typeof(TEntity).FullName;
}