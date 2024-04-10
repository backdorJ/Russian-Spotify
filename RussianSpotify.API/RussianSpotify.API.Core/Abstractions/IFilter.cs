namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Фильтр для сущностей
/// </summary>
/// <typeparam name="T">То по чему производится фильтрация</typeparam>
public interface IFilter<T>
{
    /// <summary>
    /// Фильтрация
    /// </summary>
    /// <param name="queryable">Коллекция для фильтрации</param>
    /// <param name="filterValue">Значение фильтра</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Отсортированную и отфильтрованную коллекцию</returns>
    public Task<IOrderedQueryable<T>> FilterAsync(IQueryable<T> queryable, string filterValue,
        CancellationToken cancellationToken);
}