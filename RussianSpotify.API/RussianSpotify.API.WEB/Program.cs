using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Internal;
using RussianSpotift.API.Data.PostgreSQL;
using RussianSpotify.API.Core;
using RussianSpotify.API.WEB.Configurations;
using RussianSpotify.API.WEB.Middlewares;
using RussianSpotify.Data.S3;

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

// Добавлен S3 Storage
builder.Services.AddS3Storage(builder.Configuration.GetSection("S3").Get<S3Options>()!);

// Response Compression 
builder.Services.AddResponseCompression();

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
builder.Services.AddDistributedMemoryCache(options =>
{
    options.Clock = new SystemClock(); // Устанавливаем часы, используемые для временных меток
    options.ExpirationScanFrequency = TimeSpan.FromHours(2); // Частота сканирования для проверки просроченных записей
});

builder.Services.Configure<MemoryCacheOptions>(options =>
{
    options.ExpirationScanFrequency = TimeSpan.FromHours(2); // Частота сканирования для проверки просроченных записей
    options.SizeLimit = 1000; // Максимальное количество элементов в кэше
});

var app = builder.Build();

// Применение миграций
using var scoped = app.Services.CreateScope();
var migrator = scoped.ServiceProvider.GetRequiredService<Migrator>();
await migrator.MigrateAsync();

app.UseResponseCompression();
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