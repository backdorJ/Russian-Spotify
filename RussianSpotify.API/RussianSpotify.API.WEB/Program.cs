using RussianSpotift.API.Data.PostgreSQL;
using RussianSpotify.API.Core;
using RussianSpotify.API.WEB.Configurations;
using RussianSpotify.API.WEB.Middlewares;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGenWithAuth();

// Добавлен медиатр
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

// Добавлен middleware для обработки исключений
builder.Services.AddSingleton<ExceptionMiddleware>();

// Добавлен db контекст, настроен identity с юзерами и ролями, добавлен стор с identity таблицами
builder.Services.AddDbContextWithIdentity(configuration.GetConnectionString("DefaultConnection")!);

// Добавлена аутентификация и jwt bearer
builder.Services.AddAuthenticationWithJwtAndExternalServices(configuration);

// Настройка CORS
builder.Services.AddCors(opt
    => opt.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    })
);

// Добавлен слой с db контекстом
builder.Services.AddPostgreSQLLayout();

// Добавлен слой Core
builder.Services.AddCoreLayout();

var app = builder.Build();

// Применение миграций
using var scoped = app.Services.CreateScope();
var migrator = scoped.ServiceProvider.GetRequiredService<Migrator>();
await migrator.MigrateAsync();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Добавлено использование middleware для обработки исключений
app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

// Настройка CORS
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();