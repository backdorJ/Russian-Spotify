using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RussianSpotift.API.Data.PostgreSQL.Seeder;

namespace RussianSpotift.API.Data.PostgreSQL;

/// <summary>
/// Мигратор для наката миграций и базовый значений
/// </summary>
public class Migrator
{
    private readonly EfContext _efContext;
    private readonly IDbSeeder _dbSeeder;
    private readonly ILogger<Migrator> _logger;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="efContext">Контекст БД</param>
    /// <param name="dbSeeder">Сид сервис</param>
    /// <param name="logger">Логгер</param>
    public Migrator(
        EfContext efContext,
        IDbSeeder dbSeeder,
        ILogger<Migrator> logger)
    {
        _efContext = efContext;
        _dbSeeder = dbSeeder;
        _logger = logger;
    }

    /// <summary>
    /// Мигратор
    /// </summary>
    public async Task MigrateAsync()
    {
        try
        {
            var migrateId = Guid.NewGuid().ToString();
            _logger.LogInformation($"Apply migrations started: {migrateId}");
            await _efContext.Database.MigrateAsync().ConfigureAwait(false);
            await _dbSeeder.SeedAsync(_efContext);
            _logger.LogInformation($"Apply migrations succseffuly {migrateId}");
        }
        catch (Exception e)
        {
            _logger.LogCritical($"Failed apply migrations {e.Message}");
            throw;
        }
    }
}