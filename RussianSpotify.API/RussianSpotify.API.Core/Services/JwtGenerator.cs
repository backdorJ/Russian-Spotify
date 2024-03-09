using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RussianSpotify.API.Core.Abstractions;

namespace RussianSpotify.API.Core.Services;

public class JwtGenerator: IJwtGenerator
{
    private readonly IConfiguration _configuration;

    public JwtGenerator(IConfiguration configuration) => _configuration = configuration;

    public JwtSecurityToken GenerateToken(List<Claim> authenticationClaims)
    {
        var authSignInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!));
        
        return new JwtSecurityToken( issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(12),
            claims: authenticationClaims,
            signingCredentials: new SigningCredentials(authSignInKey, SecurityAlgorithms.HmacSha256)
        );
    }
}