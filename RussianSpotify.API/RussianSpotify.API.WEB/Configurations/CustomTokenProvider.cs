using System.Globalization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;

namespace RussianSpotify.API.WEB.Configurations;

/// <summary>
/// Токен провайдер, возвращающий и валидирующий токен из 6 символов
/// </summary>
/// <typeparam name="TUser">User из Entities</typeparam>
public class CustomTokenProvider<TUser> : DataProtectorTokenProvider<TUser> where TUser : class
{
    private readonly IDistributedCache _cache;

    /// <inheritdoc />
    public CustomTokenProvider(IDataProtectionProvider dataProtectionProvider, 
        IOptions<CustomTokenProviderOptions> options, 
        ILogger<DataProtectorTokenProvider<TUser>> logger, IDistributedCache cache) 
        : base(dataProtectionProvider, options, logger)
    {
        _cache = cache;
    }

    /// <inheritdoc />
    public override async Task<string> GenerateAsync(string purpose, UserManager<TUser> manager, TUser user)
    {
        var rnd = new Random();
        var token = string.Empty;

        for (var i = 0; i < 6; ++i)
            token += rnd.Next(0, 10).ToString();

        await _cache.SetStringAsync(token, DateTime.UtcNow.AddHours(2).ToString(CultureInfo.InvariantCulture));
        return token;
    }

    /// <inheritdoc />
    public override async Task<bool> ValidateAsync(string purpose, string token, UserManager<TUser> manager, TUser user)
    {
        var expiryTimeString = await _cache.GetStringAsync(token);

        if (expiryTimeString is null)
            return false;
        
        DateTime.TryParseExact(expiryTimeString, "G",
            CultureInfo.InvariantCulture, DateTimeStyles.None, out var expiryTime);

        if (DateTime.UtcNow > expiryTime)
            return false;

        return true;
    }
}

/// <summary>
/// Custom Token Provider Options
/// </summary>
public class CustomTokenProviderOptions : DataProtectionTokenProviderOptions
{
}