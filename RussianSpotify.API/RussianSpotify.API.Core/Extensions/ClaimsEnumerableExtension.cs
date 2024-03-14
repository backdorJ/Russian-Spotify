using System.Security.Claims;

namespace RussianSpotify.API.Core.Extensions;

/// <summary>
/// Extension методы для коллекции Claims
/// </summary>
public static class ClaimsEnumerableExtension
{
    /// <summary>
    /// Возвращает Claim, подходящий по типу claimType
    /// </summary>
    /// <param name="claims">Коллекция Claims</param>
    /// <param name="claimType">из СlaimTypes</param>
    /// <returns>Значение Claim с таким типом</returns>
    public static string? GetClaimValueOf(this IEnumerable<Claim> claims, string claimType)
        => claims.FirstOrDefault(claim => claim.Type == claimType)?.Value;
}