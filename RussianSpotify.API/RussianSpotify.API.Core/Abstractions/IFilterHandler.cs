namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Отвечает за выбор нужного фильтра и применение его к коллекции
/// </summary>
public interface IFilterHandler
{
    /// <summary>
    /// Ищет нужный фильтр(класс, реализуюзий интерфейс IFilter) и применяет его к коллекции
    /// </summary>
    /// <param name="queryable">Коллекция для фильтрации</param>
    /// <param name="filterName">Имя фильтра</param>
    /// <param name="filterValue">Значение фильтра</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <typeparam name="T">Тип коллекции</typeparam>
    /// <returns>Отфильтрованная коллекция</returns>
    public Task<IOrderedQueryable<T>> GetByFilterAsync<T>(IQueryable<T> queryable, string filterName, string filterValue,
        CancellationToken cancellationToken);
}