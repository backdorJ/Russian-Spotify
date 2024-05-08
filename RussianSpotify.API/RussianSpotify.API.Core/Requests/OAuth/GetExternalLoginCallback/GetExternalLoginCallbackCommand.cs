using MediatR;
using RussianSpotify.Contracts.Requests.OAuth.GetExternalLoginCallback;

namespace RussianSpotify.API.Core.Requests.OAuth.GetExternalLoginCallback;

/// <summary>
/// Команда для авторизации через сторонние сервисы
/// </summary>
public class GetExternalLoginCallbackCommand : IRequest<GetExternalLoginCallbackResponse>
{
}