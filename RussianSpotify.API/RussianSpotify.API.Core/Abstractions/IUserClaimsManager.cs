using System.Security.Claims;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Отвечает за клэймы юзера
/// </summary>
public interface IUserClaimsManager
{
    /// <summary>
    /// Возвращает набор клэймов юзера
    /// </summary>
    /// <param name="user">User</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Лист клэймов юзера</returns>
    public Task<List<Claim>> GetUserClaimsAsync(User user, CancellationToken cancellationToken = default);
}