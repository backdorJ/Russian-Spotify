using Microsoft.AspNetCore.Http;

namespace RussianSpotify.API.Core.Enums;

/// <summary>
/// Базовые настройки Cookies
/// </summary>
public static class BaseCookieOptions
{
    /// <summary>
    /// Cookie Options
    /// </summary>
    public static readonly CookieOptions Options = new()
    {
        Expires = DateTime.UtcNow.AddHours(1)
    };
}