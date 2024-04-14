namespace RussianSpotify.API.Core.Enums;

/// <summary>
/// Данные о JWT и RefreshToken(их время жизни)
/// </summary>
public static class TokenConfiguration
{
    /// <summary>
    /// Время жизни Refresh Token в днях
    /// </summary>
    public const int RefreshTokenExpiryDays = 10;
    
    /// <summary>
    /// Время жизни JWT в минутах
    /// </summary>
    public const int AccessTokenExpiryMinutes = 300;
}