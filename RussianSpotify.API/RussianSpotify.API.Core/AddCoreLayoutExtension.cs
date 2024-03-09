using System.Reflection;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Common.Behaviors;
using RussianSpotify.API.Core.Services;

namespace RussianSpotify.API.Core;

public static class AddCoreLayoutExtension
{
    public static IServiceCollection AddCoreLayout(this IServiceCollection services)
    {
        services.AddMediatR(config 
            => config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

        services.AddValidatorsFromAssemblies(new[] { Assembly.GetExecutingAssembly() });
        
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        services.AddScoped<IJwtGenerator, JwtGenerator>();

        return services;
    }
}