using RussianSpotify.API.Core.Enums;

namespace RussianSpotify.API.Core.Entities;

public class RolePrivilege
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="role">Роль</param>
    /// <param name="privilege">Привилегия</param>
    public RolePrivilege(Role role, Privileges privilege)
    {
        Privilege = privilege;
        Role = role;
    }

    /// <summary>
    /// Конструктор
    /// </summary>
    public RolePrivilege()
    {
    }
    
    /// <summary>
    /// Идентификатор
    /// </summary>
    public Guid Id { get; protected set; }

    /// <summary>
    /// Привилегия
    /// </summary>
    public Privileges Privilege { get; protected set; }

    /// <summary>
    /// Роль
    /// </summary>
    public Role? Role { get; protected set; }

    /// <summary>
    /// Ид роли
    /// </summary>
    public Guid RoleId { get; protected set; }
}