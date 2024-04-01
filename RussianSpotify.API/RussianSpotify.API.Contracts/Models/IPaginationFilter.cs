namespace RussianSpotify.Contracts.Models;

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