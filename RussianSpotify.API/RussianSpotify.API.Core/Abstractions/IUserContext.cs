namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Контекс текущего пользоавтеля
/// </summary>
public interface IUserContext
{
    /// <summary>
    /// ИД текущего пользователя
    /// </summary>
    Guid? CurrentUserId { get; }
}