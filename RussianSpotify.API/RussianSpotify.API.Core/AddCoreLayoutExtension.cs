using System.Reflection;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Common.Behaviors;
using RussianSpotify.API.Core.Services;
using RussianSpotify.API.Core.Services.Filters;

namespace RussianSpotify.API.Core;

/// <summary>
/// Добавление Core слоя(Инъекция всех зависимостей Core)
/// </summary>
public static class AddCoreLayoutExtension
{
    /// <summary>
    /// Добавление сервисов в коллекцию
    /// </summary>
    /// <param name="services">Builder.Services</param>
    /// <returns>Коллекцию сервисов с добавленными зависимостями</returns>
    public static IServiceCollection AddCoreLayout(this IServiceCollection services)
    {
        services.AddMediatR(config 
            => config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

        services.AddValidatorsFromAssemblies(new[] { Assembly.GetExecutingAssembly() });
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        services.AddScoped<IJwtGenerator, JwtGenerator>();
        services.AddScoped<IEmailSender, EmailSender>();
        services.AddScoped<IUserContext, UserContext>();
        services.AddScoped<ISubscriptionHandler, SubscriptionHandler>();
        services.AddScoped<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<IUserClaimsManager, UserClaimsManager>();
        services.AddScoped<IFileHelper, FileHelper>();
        services.AddScoped<IRoleManager, RoleManager>();
        services.AddScoped<IFilterHandler, FilterHandler>();

        return services;
    }
}