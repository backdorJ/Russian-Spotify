using RussianSpotify.API.Core.Abstractions;

namespace RussianSpotift.API.Data.PostgreSQL.Seeder;

public interface IDbSeeder
{
    /// <summary>
    /// Seed данных
    /// </summary>
    /// <param name="efContext">Контекст БД</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns></returns>
    public Task SeedAsync(IDbContext efContext, CancellationToken cancellationToken = default);
}