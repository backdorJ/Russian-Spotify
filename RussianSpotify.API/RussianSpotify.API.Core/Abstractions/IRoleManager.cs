using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Abstractions;

/// <summary>
/// Взаимодействует с ролью пользователя
/// </summary>
public interface IRoleManager
{
    /// <summary>
    /// Проверяет принадлежит ли конкретный пользователь определённой роли
    /// </summary>
    /// <param name="user">User</param>
    /// <param name="roleName">Имя роли</param>
    /// <returns>Принадлежит ли user роли под именем roleName</returns>
    public bool IsInRole(User user, string roleName);
}