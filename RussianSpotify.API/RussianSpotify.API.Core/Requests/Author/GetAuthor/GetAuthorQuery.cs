using MediatR;
using RussianSpotify.Contracts.Requests.Author.GetAuthor;

namespace RussianSpotify.API.Core.Requests.Author.GetAuthor;

/// <summary>
/// Запрос на получение информации об авторе
/// </summary>
/// <param name="request">GetAuthorRequest реквест, который приходит с фронта</param>
public class GetAuthorQuery(GetAuthorRequest request) : GetAuthorRequest(request), IRequest<GetAuthorResponse>;