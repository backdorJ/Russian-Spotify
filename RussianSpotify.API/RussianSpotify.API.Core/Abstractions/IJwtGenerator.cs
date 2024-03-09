using System.Security.Claims;

namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Отвечает за генерацию JWT
/// </summary>
public interface IJwtGenerator
{
    /// <summary>
    /// Генерирует JWT
    /// </summary>
    /// <param name="authenticationClaims">Ифнормация о пользователе</param>
    /// <returns>JWT в виде строки</returns>
    public string GenerateToken(List<Claim> authenticationClaims);
}