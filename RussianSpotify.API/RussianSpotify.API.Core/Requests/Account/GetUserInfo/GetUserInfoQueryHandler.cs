using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.API.Core.Exceptions.AuthExceptions;
using RussianSpotify.Contracts.Requests.Account.GetUserInfo;

namespace RussianSpotify.API.Core.Requests.Account.GetUserInfo;

/// <summary>
/// Обработчик для <see cref="GetUserInfoQuery"/>
/// </summary>
public class GetUserInfoQueryHandler : IRequestHandler<GetUserInfoQuery, GetUserInfoResponse>
{
    private readonly UserManager<User> _userManager;

    private readonly IUserContext _userContext;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="userManager">UserManager{User} из Identity</param>
    /// <param name="userContext">UserContext <see cref="IUserContext"/></param>
    public GetUserInfoQueryHandler(UserManager<User> userManager, IUserContext userContext)
    {
        _userManager = userManager;
        _userContext = userContext;
    }

    /// <inheritdoc cref="IRequestHandler{TRequest,TResponse}"/>
    public async Task<GetUserInfoResponse> Handle(GetUserInfoQuery request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var userId = _userContext.CurrentUserId;

        if (userId is null)
            throw new CurrentUserIdNotFound("User Id was not found");

        var user = await _userManager.FindByIdAsync(userId.ToString()!);

        if (user is null)
            throw new NotFoundUserException($"User with id: {userId}");

        var roles = (await _userManager.GetRolesAsync(user)).ToList();


        return new GetUserInfoResponse
        {
            UserId = user.Id,
            Email = user.Email!,
            UserName = user.UserName!,
            Roles = roles,
            UserPhotoId = user.UserPhotoId
        };
    }
}