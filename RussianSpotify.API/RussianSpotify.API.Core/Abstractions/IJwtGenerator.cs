using RussianSpotify.API.Core.Entities;

namespace RussianSpotify.API.Core.Abstractions;

public interface IJwtGenerator
{
    public string GenerateToken(User user, Role role);
}