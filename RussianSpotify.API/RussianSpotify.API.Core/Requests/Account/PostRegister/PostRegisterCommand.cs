using MediatR;
using RussianSpotify.Contracts.Requests.Account.PostRegister;

namespace RussianSpotify.API.Core.Requests.Account.PostRegister;

/// <summary>
/// Команда для регистрации пользователя
/// </summary>
public class PostRegisterCommand: IRequest
{
    public PostRegisterCommand(PostRegisterRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        UserName = request.UserName;
        Password = request.Password;
        PasswordConfirm = request.PasswordConfirm;
        Email = request.Email;
    }

    public PostRegisterCommand()
    {
    }
    
    /// <summary>
    /// Никнейм пользователя
    /// </summary>
    public string UserName { get; set; } = default!;

    /// <summary>
    /// Пароль
    /// </summary>
    public string Password { get; set; } = default!;

    /// <summary>
    /// Подтверждение пароля
    /// </summary>
    public string PasswordConfirm { get; set; } = default!;

    /// <summary>
    /// Почта
    /// </summary>
    public string Email { get; set; } = default!;
}