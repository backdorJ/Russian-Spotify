using System.Net;

namespace RussianSpotify.API.WEB.Models.Dtos;

public class AuthResultDto
{
    public bool IsSuccessfull { get; set; }

    public List<string> ErrorMessages { get; set; } = new();

    public string? ReturnUrl { get; set; }
    
    public string Token { get; set; }
}