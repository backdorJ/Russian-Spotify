using MediatR;
using RussianSpotify.Contracts.Requests.Author.GetAuthorsByFilter;

namespace RussianSpotify.API.Core.Requests.Author.GetAuthorsByFilter;

public class GetAuthorsByFilterQuery : GetAuthorsByFilterRequest, IRequest<GetAuthorsByFilterResponse>
{
    public GetAuthorsByFilterQuery(GetAuthorsByFilterRequest request) : base(request)
    {
    }
}