namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Провайдер даты
/// </summary>
public interface IDateTimeProvider
{
    DateTime CurrentDate { get; }
}