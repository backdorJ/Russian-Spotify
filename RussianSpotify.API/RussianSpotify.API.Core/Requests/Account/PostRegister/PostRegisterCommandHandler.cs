using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;

namespace RussianSpotify.API.Core.Requests.Account.PostRegister;

/// <summary>
/// Обработчик для <see cref="PostRegisterCommand"/>
/// </summary>
public class PostRegisterCommandHandler : IRequestHandler<PostRegisterCommand>
{
    private readonly UserManager<User> _userManager;

    public PostRegisterCommandHandler(UserManager<User> userManager)
        => _userManager = userManager;

    /// <summary>
    /// Регистрирует пользователя
    /// </summary>
    /// <param name="request">PostRegisterCommand</param>
    /// <param name="cancellationToken"></param>
    /// <exception cref="ArgumentNullException">Если пустой request</exception>
    /// <exception cref="EmailAlreadyRegisteredException">Если существует пользователь с такой же почтой</exception>
    /// <exception cref="RegisterUserException">Если UserManager по каким-то причинам не смог зарегистрировать пользователя</exception>
    public async Task Handle(PostRegisterCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is not null)
            throw new EmailAlreadyRegisteredException(AuthErrorMessages.UserWithSameEmail);

        user = new User
        {
            Email = request.Email, UserName = request.UserName, Login = request.UserName,
            SecurityStamp = Guid.NewGuid().ToString()
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
            throw new RegisterUserException(
                string.Join("\n", result.Errors.Select(errror => errror.Description)));

        await _userManager.AddToRoleAsync(user, BaseRoles.UserRoleName);
    }
}