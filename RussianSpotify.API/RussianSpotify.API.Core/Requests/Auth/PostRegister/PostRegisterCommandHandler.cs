using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Requests.Account.PostRegister;
using RussianSpotify.Contracts.Requests.Account.PostRegister;

namespace RussianSpotify.API.Core.Requests.Auth.PostRegister;

/// <summary>
/// Обработчик для <see cref="PostRegisterCommand"/>
/// </summary>
public class PostRegisterCommandHandler : IRequestHandler<PostRegisterCommand, PostRegisterResponse>
{
    private readonly UserManager<User> _userManager;

    private readonly IEmailSender _emailSender;
    
    public PostRegisterCommandHandler(UserManager<User> userManager, IEmailSender emailSender)
        => (_userManager, _emailSender) = (userManager, emailSender);

    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<PostRegisterResponse> Handle(PostRegisterCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is not null)
            throw new EmailAlreadyRegisteredException(AuthErrorMessages.UserWithSameEmail);

        user = new User
        {
            Email = request.Email, UserName = request.UserName,
            SecurityStamp = Guid.NewGuid().ToString(),
            EmailConfirmed = false
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        
        if (!result.Succeeded)
            throw new RegisterUserException(
                string.Join("\n", result.Errors.Select(error => error.Description)));
        
        await _userManager.AddToRoleAsync(user, BaseRoles.UserRoleName.ToUpper());
        
        var emailVerificationCode = await _userManager.GenerateEmailConfirmationTokenAsync(user);

        // TODO: настроить RussianSpotify.API.Core/Models/EmailTemplateHelper, чтобы он генерил сообщение
        await _emailSender.SendEmailAsync(request.Email,
            EmailMessages.ConfirmEmailMessage(emailVerificationCode), cancellationToken);
        
        return new PostRegisterResponse { Email = request.Email };
    }
}