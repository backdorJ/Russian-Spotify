using System.Security.Claims;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Abstractions;

public interface IUserClaimsManager
{
    public Task<List<Claim>> GetUserClaimsAsync(User user, CancellationToken cancellationToken = default);
}