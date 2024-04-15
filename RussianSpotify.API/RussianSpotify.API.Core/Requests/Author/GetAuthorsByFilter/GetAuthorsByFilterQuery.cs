using MediatR;
using RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

namespace RussianSpotify.API.Core.Requests.Author.GetAuthorsByFilter;

/// <summary>
/// Запрос для получения авторов по фильтру
/// </summary>
public class GetAuthorsByFilterQuery : GetAuthorsByFilterRequest, IRequest<GetAuthorsByFilterResponse>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="request">Запрос с параметрами</param>
    public GetAuthorsByFilterQuery(GetAuthorsByFilterRequest request) : base(request)
    {
    }
}