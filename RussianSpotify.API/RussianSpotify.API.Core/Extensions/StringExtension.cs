namespace RussianSpotify.API.Core.Extensions;

/// <summary>
/// Extension методы для строк
/// </summary>
public static class StringExtension
{
    /// <summary>
    /// Метод для подстановки шаблонов в темплейтах html
    /// </summary>
    /// <param name="template">HTML шаблон</param>
    /// <param name="placeholders">Словарь, где ключ - {template}, а значение - {templateValue}</param>
    /// <returns>Строку с подставленными значениями в шаблон</returns>
    public static string ReplacePlaceholders(this string template, IDictionary<string, string> placeholders)
    {
        foreach (var (key, value) in placeholders)
            template = template.Replace(key, value);

        return template;
    }
}