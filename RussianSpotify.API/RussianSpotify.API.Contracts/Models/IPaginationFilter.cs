namespace RussianSpotify.Contracts.Models;

/// <summary>
/// Фильтр дающий возможность использовать пагинацию
/// </summary>
public interface IPaginationFilter
{
    /// <summary>
    /// Страница
    /// </summary>
    public int PageNumber { get; }

    /// <summary>
    /// Размер
    /// </summary>
    public int PageSize { get; }
}