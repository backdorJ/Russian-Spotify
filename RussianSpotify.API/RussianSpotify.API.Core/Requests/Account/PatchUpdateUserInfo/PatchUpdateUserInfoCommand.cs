using MediatR;
using RussianSpotify.Contracts.Requests.Account.PatchUpdateUserInfo;

namespace RussianSpotify.API.Core.Requests.Account.PatchUpdateUserInfo;

/// <summary>
/// Запрос на обновление данных о пользователе
/// </summary>
public class PatchUpdateUserInfoCommand(PatchUpdateUserInfoRequest request)
    : PatchUpdateUserInfoRequest(request), IRequest<PatchUpdateUserInfoResponse>;