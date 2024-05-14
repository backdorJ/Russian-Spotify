using RussianSpotify.API.Core.Enums;

namespace RussianSpotify.API.Core.DefaultSettings;

public static class BaseRoles
{
    /// <summary>
    /// Ид роли - пользователь
    /// </summary>
    public static Guid UserId => new("30da48dc-a039-43cb-ad40-5d218a22019a");

    /// <summary>
    /// Имя роли - пользователь
    /// </summary>
    public const string UserRoleName = "Пользователь";

    /// <summary>
    /// Ид роли - автор
    /// </summary>
    public static Guid AuthorId => new("03f7f3cf-20d1-496f-81d9-82626073bbd8");

    /// <summary>
    /// Имя роли - автор
    /// </summary>
    public const string AuthorRoleName = "Автор";

    /// <summary>
    /// ИД роли - админ
    /// </summary>
    public static Guid AdminId => new("81856f81-ade4-421c-adbf-b047e78b0e62");

    /// <summary>
    /// Имя роли - автор
    /// </summary>
    public const string AdminRoleName = "Админ";

    /// <summary>
    /// Базовые привилегии для ролей
    /// </summary>
    public static readonly IReadOnlyDictionary<Guid, List<Privileges>> RolePrivileges
        = new Dictionary<Guid, List<Privileges>>
        {
            [UserId] = new()
            {
                Privileges.ListenMusic
            },
            [AuthorId] = new()
            {
                Privileges.ListenMusic,
                Privileges.DeployMusic
            },
            [AdminId] = new()
            {
                Privileges.ListenMusic,
                Privileges.DeployMusic,
                Privileges.EditPages,
            }
        };
}