using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using RussianSpotify.API.Core.Abstractions;

namespace RussianSpotify.API.Core.Services;

/// <summary>
/// Контекст пользователя
/// </summary>
public class UserContext : IUserContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    /// <summary>
    /// Контекст
    /// </summary>
    /// <param name="httpContextAccessor">Аксессор http</param>
    public UserContext(IHttpContextAccessor httpContextAccessor)
         => _httpContextAccessor = httpContextAccessor;
    
    /// <inheritdoc />
    public Guid? CurrentUserId => Guid.TryParse(User?.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId)
        ? userId
        : null;

    /// <summary>
    /// Клаймы текущего пользователя
    /// </summary>
    private ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;
}