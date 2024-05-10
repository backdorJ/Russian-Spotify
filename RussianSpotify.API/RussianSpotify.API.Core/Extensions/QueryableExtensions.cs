using RussianSpotify.Contracts.Models;

namespace RussianSpotify.API.Core.Extensions;

/// <summary>
/// Расширения для IQueryable
/// </summary>
public static class QueryableExtensions
{
    /// <summary>
    /// SkipTake - сколько пропустить и сколько взять
    /// </summary>
    /// <param name="query">Квери</param>
    /// <param name="request">Запрос</param>
    /// <typeparam name="T">Сущность</typeparam>
    /// <returns></returns>
    public static IQueryable<T> SkipTake<T>(this IQueryable<T> query, IPaginationFilter request)
    {
        if (query is null)
            return query;

        if (request.PageNumber < 0 || request.PageSize < 0)
            return query;

        return query
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize);
    }
}