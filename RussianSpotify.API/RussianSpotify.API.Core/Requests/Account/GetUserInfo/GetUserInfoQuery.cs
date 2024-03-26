using MediatR;
using RussianSpotify.Contracts.Requests.Account.GetUserInfo;

namespace RussianSpotify.API.Core.Requests.Account.GetUserInfo;

/// <summary>
/// Запрос на получение <see cref="GetUserInfoResponse"/>
/// </summary>
public class GetUserInfoQuery : IRequest<GetUserInfoResponse>
{
}