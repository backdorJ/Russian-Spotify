using MediatR;
using RussianSpotify.Contracts.Requests.Account.PatchUpdateUserInfo;

namespace RussianSpotify.API.Core.Requests.Account.PatchUpdateUserInfo;

public class PatchUpdateUserInfoCommand : PatchUpdateUserInfoRequest, IRequest<PatchUpdateUserInfoResponse> 
{
    public PatchUpdateUserInfoCommand(PatchUpdateUserInfoRequest request) : base(request)
    {
    }
}