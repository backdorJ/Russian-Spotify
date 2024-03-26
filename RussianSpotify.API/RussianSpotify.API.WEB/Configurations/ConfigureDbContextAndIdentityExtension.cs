using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using RussianSpotift.API.Data.PostgreSQL;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.WEB.Configurations;

/// <summary>
/// Конфигурация бд
/// </summary>
public static class ConfigureDbContextAndIdentityExtension
{
    private const string AllowAnyCharactersWithRus =
        " абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";

    /// <summary>
    /// Добавление db контекста с настройкой identity(юзеры, роли и стор)
    /// </summary>
    /// <param name="services">Коллекция сервисов билдера</param>
    /// <param name="connectionString">Cтрока подключения</param>
    /// <returns>IdentityBuilder</returns>
    public static IdentityBuilder
        AddDbContextWithIdentity(this IServiceCollection services, string connectionString) =>
        services.AddDbContext<EfContext>(
                options => options.UseNpgsql(connectionString))
            .AddIdentity<User, Role>(opt =>
            {
                opt.User.RequireUniqueEmail = true;
                opt.Password.RequiredLength = 8;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireDigit = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
                opt.User.AllowedUserNameCharacters = AllowAnyCharactersWithRus;
                opt.User.RequireUniqueEmail = true;
                opt.Tokens.EmailConfirmationTokenProvider = "customtokenprovider";
                opt.Tokens.PasswordResetTokenProvider = "customtokenprovider";
            })
            .AddTokenProvider<CustomTokenProvider<User>>("customtokenprovider")
            .AddEntityFrameworkStores<EfContext>();
}