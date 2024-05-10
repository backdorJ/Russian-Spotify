using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Entities;
using File = RussianSpotify.API.Core.Entities.File;

namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Интерфейс контекста бд
/// </summary>
public interface IDbContext
{
    /// <summary>
    /// Пользователи
    /// </summary>
    public DbSet<User> Users { get; set; }

    /// <summary>
    /// Роли
    /// </summary>
    public DbSet<Role> Roles { get; set; }

    /// <summary>
    /// Привилегии
    /// </summary>
    public DbSet<RolePrivilege> Privileges { get; set; }

    /// <summary>
    /// Альбомы
    /// </summary>
    public DbSet<Playlist> Playlists { get; set; }

    /// <summary>
    /// Песни
    /// </summary>
    public DbSet<Song> Songs { get; set; }

    /// <summary>
    /// Подписки
    /// </summary>
    public DbSet<Subscribe> Subscribes { get; set; }

    /// <summary>
    /// Категории
    /// </summary>
    public DbSet<Category> Categories { get; set; }

    /// <summary>
    /// Файлы
    /// </summary>
    public DbSet<File> Files { get; set; }

    /// <summary>
    /// Корзины
    /// </summary>
    public DbSet<Bucket> Buckets { get; set; }

    /// <summary>
    /// Уведомления
    /// </summary>
    public DbSet<EmailNotification> EmailNotifications { get; set; }

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}