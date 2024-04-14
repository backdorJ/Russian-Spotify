using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions;

namespace RussianSpotify.API.Core.Services.Filters;

/// <summary>
/// <inheritdoc cref="IFilterHandler"/>
/// </summary>
public class FilterHandler : IFilterHandler
{
    /// <inheritdoc cref="IFilterHandler"/>
    public async Task<IOrderedQueryable<T>> GetByFilterAsync<T>(IQueryable<T> queryable, string filterName, string filterValue,
        CancellationToken cancellationToken)
    {
        var filter = typeof(FilterHandler).Assembly.GetTypes()
            .Where(x => x.GetInterfaces().Any(i => i.Name.Equals(typeof(IFilter<T>).Name)))
            .FirstOrDefault(x => x.Name.Equals(filterName+"Filter", StringComparison.OrdinalIgnoreCase));
        
        if (filter is null)
            throw new BadRequestException("Такого фильтра не существует");

        var instance = Activator.CreateInstance(filter, new object[] { }) as IFilter<T>;

        return await instance!.FilterAsync(queryable, filterValue, cancellationToken);
    }
}