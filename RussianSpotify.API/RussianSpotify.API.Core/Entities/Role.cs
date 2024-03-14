using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions;

namespace RussianSpotify.API.Core.Entities;

public class Role : IdentityRole<Guid>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    public Role()
    {
        Privileges = new List<RolePrivilege>();
    }
    
    /// <summary>
    /// Привилегии
    /// </summary>
    public List<RolePrivilege> Privileges { get; protected set; }

    /// <summary>
    /// Обновить привилегии
    /// </summary>
    /// <param name="privilegesList">Список привилегий</param>
    public void UpdatePrivileges(List<Privileges> privilegesList)
    {
        if (Privileges is null)
            throw new NotIncludedException(nameof(Privileges));
        
        var rolePrivilegesToDelete = Privileges.Where(x =>
                !privilegesList.Exists(y => y == x.Privilege))
            .ToList();

        foreach (var rolePrivilegeToDelete in rolePrivilegesToDelete)
            Privileges.Remove(rolePrivilegeToDelete);

        foreach (var privilegeToUpdate in privilegesList)
            if (!Privileges.Exists(x => x.Privilege == privilegeToUpdate))
                Privileges.Add(new RolePrivilege(this, privilegeToUpdate));
    }
}