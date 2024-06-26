using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Exceptions.AuthExceptions;
using RussianSpotify.API.Core.Extensions;
using RussianSpotify.API.Core.Models;
using RussianSpotify.Contracts.Requests.Auth.PostRegister;

namespace RussianSpotify.API.Core.Requests.Auth.PostRegister;

/// <summary>
/// Обработчик для <see cref="PostRegisterCommand"/>
/// </summary>
public class PostRegisterCommandHandler
    : IRequestHandler<PostRegisterCommand, PostRegisterResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly IEmailSender _emailSender;
    private readonly IRoleManager _roleManager;

    public PostRegisterCommandHandler(
        UserManager<User> userManager,
        IEmailSender emailSender,
        IRoleManager roleManager)
    {
        _userManager = userManager;
        _emailSender = emailSender;
        _roleManager = roleManager;
    }

    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<PostRegisterResponse> Handle(PostRegisterCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is not null)
            throw new EmailAlreadyRegisteredException(AuthErrorMessages.UserWithSameEmail);

        if (request.Role == BaseRoles.AuthorRoleName)
        {
            var authorWithSameName = await _userManager.FindByNameAsync(request.UserName);
            if (authorWithSameName is not null &&
                await _roleManager.IsInRoleAsync(authorWithSameName, BaseRoles.AuthorRoleName, cancellationToken))
                throw new BadRequestException($"Автор с именем: {request.UserName} уже существует");
        }

        user = new User
        {
            Email = request.Email, UserName = request.UserName,
            SecurityStamp = Guid.NewGuid().ToString(),
            EmailConfirmed = false
        };

        if (request.Role.Equals(BaseRoles.AdminRoleName, StringComparison.OrdinalIgnoreCase))
            throw new UserCannotBeAdminException("User can not be register as Admin");

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
            throw new RegisterUserException(
                string.Join("\n", result.Errors.Select(error => error.Description)));

        var addToRoleResult = await _userManager.AddToRoleAsync(user, request.Role.ToUpper());

        if (!addToRoleResult.Succeeded)
            await _userManager.AddToRoleAsync(user, BaseRoles.UserRoleName.ToUpper());

        var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

        var messageTemplate =
            await EmailTemplateHelper.GetEmailTemplateAsync(Templates.SendEmailConfirmationMessage,
                cancellationToken);

        var placeholders = new Dictionary<string, string> { ["{confirmationToken}"] = confirmationToken };

        var message = messageTemplate.ReplacePlaceholders(placeholders);

        await _emailSender.SendEmailAsync(user.Email,
            message, cancellationToken);

        return new PostRegisterResponse { Email = request.Email };
    }
}