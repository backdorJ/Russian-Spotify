using MediatR;
using Microsoft.AspNetCore.Identity;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.AccountExceptions;
using RussianSpotify.Contracts.Requests.Account.GetUserInfo;

namespace RussianSpotify.API.Core.Requests.Account.GetUserInfo;

/// <summary>
/// Обработчик для <see cref="GetUserInfoQuery"/>
/// </summary>
public class GetUserInfoQueryHandler : IRequestHandler<GetUserInfoQuery, GetUserInfoResponse>
{
    private readonly UserManager<User> _userManager;

    private readonly IUserContext _userContext;

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

        return new GetUserInfoResponse { Email = user.Email!, UserName = user.UserName! };
    }
}