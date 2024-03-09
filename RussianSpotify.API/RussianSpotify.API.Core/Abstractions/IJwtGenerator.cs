using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Abstractions;

public interface IJwtGenerator
{
    public JwtSecurityToken GenerateToken(List<Claim> authenticationClaims);
}