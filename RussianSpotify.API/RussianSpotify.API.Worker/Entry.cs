using Hangfire;
using Hangfire.MemoryStorage;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using RussianSpotify.API.Core.Models;
using RussianSpotify.API.Worker.Workers;

namespace RussianSpotify.API.Worker;

/// <summary>
/// Точка входа для воркера
/// </summary>
public static class Entry
{
    /// <summary>
    /// Добавить службу с тасками по расписанию
    /// </summary>
    /// <param name="serviceCollection"></param>
    /// <returns></returns>
    public static IServiceCollection AddHangfireWorker(this IServiceCollection serviceCollection)
        => serviceCollection.AddHangfire(x => x.UseMemoryStorage());

    public static IApplicationBuilder UseHangfireWorker(
        this IApplicationBuilder app,
        HangfireOptions options)
    {
        if (options is null)
            throw new ArgumentNullException(nameof(options));
        
        if (options.DisplayDashBoard)
            app.UseHangfireDashboard("/worker", new DashboardOptions
            {
                Authorization = new[] { new DashboardAuthorizationFilter() },
            });

        app.UseHangfireServer();
        
        AddJon<SendEndSubscribeNotification>(options.CronForSendNotificationSubscribe);
        AddJon<EmailNotificator>(options.CronForSendEmailNotificator);
        
        return app;
    }

    /// <summary>
    /// Добавить задачу
    /// </summary>
    /// <param name="cron">Крон</param>
    /// <typeparam name="T">Задача</typeparam>
    private static void AddJon<T>(string cron)
        where T : IWorker
        => RecurringJob.AddOrUpdate<T>(
            typeof(T).FullName,
            (x) => x.RunAsync(),
            cron,
            TimeZoneInfo.Local);
}