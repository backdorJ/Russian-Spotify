using MediatR;
using RussianSpotify.Contracts.Requests.Author.GetAuthor;

namespace RussianSpotify.API.Core.Requests.Author.GetAuthor;

/// <summary>
/// Запрос на получение информации об авторе
/// </summary>
public class GetAuthorQuery : GetAuthorRequest, IRequest<GetAuthorResponse>
{
    public GetAuthorQuery(GetAuthorRequest request)
        : base(request)
    {
    }
}