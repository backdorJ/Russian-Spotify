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

    private Guid? _currentUserId;

    private string? _roleName;
    
    /// <inheritdoc />
    public Guid? CurrentUserId
    {
        get
        {
            _currentUserId ??= Guid.TryParse(User?.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId)
                ? userId
                : null;
            
            return _currentUserId;
        }
    }
    
    /// <inheritdoc />
    public string? RoleName
    {
        get
        {
            _roleName ??= User?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;
            return _roleName;
        }
    }

    /// <summary>
    /// Клаймы текущего пользователя
    /// </summary>
    private ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;
}