using System.Reflection;
using RussianSpotify.API.Core.Entities;
using File = System.IO.File;

namespace RussianSpotify.API.Core.Models;

/// <summary>
/// Хелпер по работе с уведмолениями
/// </summary>
public class EmailTemplateHelper
{
    private const string TemplatePath = "RussianSpotify.API.Core.Templates.HTML";

    /// <summary>
    /// Создать уведмоление
    /// </summary>
    /// <param name="placeholders">Шаблоны</param>
    /// <param name="template">Шаблон письма</param>
    /// <param name="head">Заголовок</param>
    /// <param name="emailTo">Кому</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Уведомление</returns>
    public static async Task<EmailNotification> GetEmailNotificationAsync(
        Dictionary<string, string> placeholders,
        string template,
        string head,
        string emailTo,
        CancellationToken cancellationToken)
    {
        await using var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream($"{TemplatePath}.{template}")
                                 ?? throw new FileNotFoundException($"Шаблон Email сообщения с названием {template} не найден");
        using var reader = new StreamReader(stream);

        var content = await reader.ReadToEndAsync(cancellationToken);

        foreach (var (key, value) in placeholders)
            content = content.Replace(key, value);

        return EmailNotification.CreateNotification(
            body: content,
            head: head,
            emailTo: emailTo);
    }
}