using System.ComponentModel;

namespace RussianSpotify.API.Core.Extensions;

/// <summary>
/// Расширения для Enum
/// </summary>
public static class EnumExtensions
{
    /// <summary>
    /// Получть описание из атрибута Description
    /// </summary>
    /// <param name="value">Enum</param>
    /// <returns>Описание</returns>
    public static string GetDescription(this Enum value)
    {
        var type = value.GetType();

        var attributes = (DescriptionAttribute[])type.GetCustomAttributes(typeof(DescriptionAttribute), false);

        return attributes.Length > 0
            ? attributes[0].Description
            : value.ToString();
    }
}