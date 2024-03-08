using System.Net;

namespace RussianSpotify.API.WEB.Models.Dtos;

public class AuthResultDto
{
    public HttpStatusCode StatusCode { get; set; }
    
    public bool IsSuccessfull { get; set; }
    
    public string ReturnUrl { get; set; }
    
    public string MessageOnError { get; set; }
    
    public byte[] Token { get; set; }
}