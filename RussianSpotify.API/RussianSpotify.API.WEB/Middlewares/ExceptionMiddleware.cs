using System.Net;
using FluentValidation;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;

namespace RussianSpotify.API.WEB.Middlewares;

/// <summary>
/// Middleware, отвечающий за обработку ошибок
/// </summary>
public class ExceptionMiddleware : IMiddleware
{
    /// <inheritdoc cref="IMiddleware"/>
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception exception)
        {
            context.Response.StatusCode = exception switch
                {
                    NotFoundUserException or WrongPasswordException
                        => (int)HttpStatusCode.Unauthorized,
                    
                    ValidationException 
                        => (int)HttpStatusCode.BadRequest,
                    
                    EmailAlreadyRegisteredException or RegisterUserException or _ 
                        => (int)HttpStatusCode.InternalServerError
                };

            await context.Response.WriteAsJsonAsync(exception.Message);
        }
    }
}