using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Enums;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Exceptions.AuthExceptions;
using RussianSpotify.API.Core.Models;
using RussianSpotify.Contracts.Requests.Account.PatchUpdateUserInfo;

namespace RussianSpotify.API.Core.Requests.Account.PatchUpdateUserInfo;

/// <summary>
/// Обработчик для <see cref="PatchUpdateUserInfoCommand"/>
/// </summary>
public class PatchUpdateUserInfoCommandHandler
    : IRequestHandler<PatchUpdateUserInfoCommand, PatchUpdateUserInfoResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly IUserContext _userContext;
    private readonly IUserClaimsManager _claimsManager;
    private readonly IJwtGenerator _jwtGenerator;
    private readonly IEmailSender _emailSender;
    private readonly IFileHelper _fileHelper;
    private readonly IDbContext _dbContext;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="userManager">UserManager{User} из Identity</param>
    /// <param name="userContext">UserContext <see cref="IUserContext"/></param>
    /// <param name="claimsManager">Claims Manager <see cref="IUserClaimsManager"/>/></param>
    /// <param name="jwtGenerator">Генератор JWT токенов</param>
    /// <param name="emailSender">Email sender <see cref="IEmailSender"/></param>
    /// <param name="fileHelper"></param>
    /// <param name="dbContext"></param>
    public PatchUpdateUserInfoCommandHandler(
        UserManager<User> userManager,
        IUserContext userContext,
        IUserClaimsManager claimsManager,
        IJwtGenerator jwtGenerator,
        IEmailSender emailSender,
        IFileHelper fileHelper,
        IDbContext dbContext)
    {
        _userManager = userManager;
        _userContext = userContext;
        _claimsManager = claimsManager;
        _jwtGenerator = jwtGenerator;
        _emailSender = emailSender;
        _fileHelper = fileHelper;
        _dbContext = dbContext;
    }

    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<PatchUpdateUserInfoResponse> Handle(PatchUpdateUserInfoCommand request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var userId = _userContext.CurrentUserId;

        if (userId is null)
            throw new CurrentUserIdNotFound("User Id was not found");

        var user = await _userManager.Users.Include(i => i.UserPhoto)
            .FirstOrDefaultAsync(i => i.Id == userId, cancellationToken);

        if (user is null)
            throw new NotFoundUserException($"User with id: {userId}");

        user.UserName = !string.IsNullOrWhiteSpace(request.UserName) ? request.UserName : user.UserName;

        if (request.FilePhotoId is not null)
        {
            Console.WriteLine(request.FilePhotoId.Value);
            // Достаем картину из бд
            var imageFromDb = await _dbContext.Files
                .FirstOrDefaultAsync(i => i.Id == request.FilePhotoId.Value, cancellationToken);

            if (imageFromDb is null)
                throw new UserBadImageException("File not found");
            
            // Проверка, является ли файл картинкой и присвоение
            if (!_fileHelper.IsImage(imageFromDb))
                throw new UserBadImageException("File's content type is not Image");

            // Удаляем текущую картинку
            if (user.UserPhoto is not null)
                await _fileHelper.DeleteFileAsync(user.UserPhoto, cancellationToken);

            user.UserPhoto = imageFromDb;
        }

        var changePasswordResult = IdentityResult.Success;

        if (!string.IsNullOrWhiteSpace(request.NewPassword)
            && !string.IsNullOrWhiteSpace(request.NewPasswordConfirm)
            && request.NewPasswordConfirm!.Equals(request.NewPassword, StringComparison.Ordinal))
        {
            if (string.IsNullOrWhiteSpace(user.PasswordHash))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                changePasswordResult = await _userManager.ResetPasswordAsync(user, token, request.NewPassword);
            }
            else
                changePasswordResult =
                    await _userManager.ChangePasswordAsync(user,
                        request.CurrentPassword!, request.NewPassword);
        }

        if (!changePasswordResult.Succeeded)
            throw new InvalidChangePasswordException(string.Join("\n",
                changePasswordResult.Errors.Select(x => x.Description)));

        var claims = await _claimsManager.GetUserClaimsAsync(user, cancellationToken);

        user.AccessToken = _jwtGenerator.GenerateToken(claims);
        user.RefreshToken = _jwtGenerator.GenerateRefreshToken();
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(TokenConfiguration.RefreshTokenExpiryDays);

        var message =
            await EmailTemplateHelper.GetEmailTemplateAsync(Templates.SendUserInfoUpdatedNotification,
                cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
        await _emailSender.SendEmailAsync(user.Email!, message, cancellationToken);

        return new PatchUpdateUserInfoResponse { AccessToken = user.AccessToken, RefreshToken = user.RefreshToken };
    }
}