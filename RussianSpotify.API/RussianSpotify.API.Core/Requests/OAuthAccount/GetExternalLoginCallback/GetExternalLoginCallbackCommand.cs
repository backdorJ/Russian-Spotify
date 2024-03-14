using MediatR;
using RussianSpotify.Contracts.Requests.OAuthAccount.GetExternalLoginCallback;

namespace RussianSpotify.API.Core.Requests.OAuthAccount.GetExternalLoginCallback;

/// <summary>
/// Команда для авторизации через сторонние сервисы
/// </summary>
public class GetExternalLoginCallbackCommand : IRequest<GetExternalLoginCallbackResponse>
{
}