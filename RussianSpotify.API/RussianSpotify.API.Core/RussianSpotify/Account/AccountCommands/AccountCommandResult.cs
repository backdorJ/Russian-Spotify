using System.IdentityModel.Tokens.Jwt;
using System.Net;

namespace RussianSpotify.API.Core.RussianSpotify.Account.AccountCommands;

public class AccountCommandResult
{
    public HttpStatusCode StatusCode { get; set; }
    
    public bool IsSuccessfull { get; set; }

    public List<string> ErrorMessages { get; set; } = new();
    
    public string Token { get; set; }
}