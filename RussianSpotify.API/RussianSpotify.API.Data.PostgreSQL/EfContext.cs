using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RussianSpotift.API.Data.PostgreSQL.Confugurations;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using File = RussianSpotify.API.Core.Entities.File;

namespace RussianSpotift.API.Data.PostgreSQL;

/// <summary>
/// Контекст БД
/// </summary>
public class EfContext
    : IdentityDbContext<User, Role, Guid>, IDbContext
{
    /// <summary>
    /// Конструктор
    /// </summary>
    public EfContext(DbContextOptions options)
        : base(options)
    {
    }

    /// <inheritdoc />
    public DbSet<Role> Roles { get; set; } = default!;

    /// <inheritdoc />
    public DbSet<RolePrivilege> Privileges { get; set; } = default!;

    /// <inheritdoc />
    public DbSet<Album> Albums { get; set; } = default!;

    /// <inheritdoc /> 
    public DbSet<Song> Songs { get; set; } = default!;

    /// <inheritdoc />
    public DbSet<Subscribe> Subscribes { get; set; } = default!;

    /// <inheritdoc />
    public DbSet<Category> Categories { get; set; } = default!;

    /// <inheritdoc />
    public DbSet<File> Files { get; set; } = default!;

    /// <inheritdoc />
    public DbSet<Bucket> Buckets { get; set; } = default!;

    /// <inheritdoc />
    public DbSet<EmailNotification> EmailNotifications { get; set; }

    /// <inheritdoc />
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new RoleConfiguration());
        builder.ApplyConfiguration(new UserConfiguration());
        builder.ApplyConfiguration(new RolePrivilegeConfiguration());
        builder.ApplyConfiguration(new SubscribeConfiguration());
        builder.ApplyConfiguration(new AlbumConfiguration());
        builder.ApplyConfiguration(new SongConfiguration());
        builder.ApplyConfiguration(new CategoryConfiguration());
        builder.ApplyConfiguration(new FileConfiguration());
        builder.ApplyConfiguration(new BucketConfiguration());
        builder.ApplyConfiguration(new EmailNotificationConfiguration());
        
        base.OnModelCreating(builder);
    }
}