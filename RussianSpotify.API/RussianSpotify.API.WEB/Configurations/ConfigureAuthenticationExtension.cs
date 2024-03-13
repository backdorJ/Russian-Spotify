using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using RussianSpotify.API.Core.Exceptions;

namespace RussianSpotify.API.WEB.Configurations;

/// <summary>
/// Конфигурация аутентификации
/// </summary>
public static class ConfigureAuthenticationExtension
{
    /// <summary>
    /// Добавление Аутентификации с настройкой JwtBearer
    /// </summary>
    /// <param name="services">Коллекция сервисов билдера</param>
    /// <param name="configuration">конфигурация(appsettings.json)</param>
    /// <returns>AuthenticationBuilder</returns>
    public static AuthenticationBuilder AddAuthenticationWithJwtBearer(this IServiceCollection services,
        IConfiguration configuration) =>
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidAudience = configuration["JWT:ValidAudience"],
                ValidateLifetime = true,
                ValidIssuer = configuration["JWT:ValidIssuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]!))
            };
        }).AddOAuth("VK", "VKontakte", config =>
        {
            config.ClientId =  configuration["Authentication:VK:AppId"]!;
            config.ClientSecret =  configuration["Authentication:VK:AppSecret"]!;
            config.ClaimsIssuer = "VKontakte";
            config.CallbackPath = new PathString("/signin-vkontakte-token");
            config.AuthorizationEndpoint = "https://oauth.vk.com/authorize";
            config.TokenEndpoint = "https://oauth.vk.com/access_token";
            config.Scope.Add("email");
            config.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "user_id");
            config.ClaimActions.MapJsonKey(ClaimTypes.Email, "email");
            config.SaveTokens = true;
            config.Events = new OAuthEvents
            {
                OnCreatingTicket = context =>
                {
                     context.RunClaimActions(context.TokenResponse.Response!.RootElement);
                     return Task.CompletedTask;
                }
            };
        });
}