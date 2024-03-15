using System.Reflection;
using Microsoft.OpenApi.Models;

namespace RussianSpotify.API.WEB.Configurations;

/// <summary>
/// Конфигурация сваггера
/// </summary>
public static class ConfigureSwaggerExtension
{
    /// <summary>
    /// Добавление SwaggerGen и настройка его Аутентификации и XML-документации
    /// </summary>
    /// <param name="services">Сервисы билдера</param>
    /// <returns>IServiceCollection</returns>
    public static IServiceCollection AddSwaggerGenWithAuth(this IServiceCollection services) => 
        services.AddSwaggerGen(opt =>
        {
            var xmlFileName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            opt.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFileName));

            opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "Authorization token"
            });

            opt.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });
}