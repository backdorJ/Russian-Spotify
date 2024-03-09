using System.ComponentModel.DataAnnotations;
using MediatR;

namespace RussianSpotify.API.Core.RussianSpotify.Account.AccountCommands.SignInCommand;

public class SignInCommand: IRequest<AccountCommandResult>
{
    [Required] 
    public string UserName { get; set; } = string.Empty;
    
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    public bool RememberMe { get; set; } = false;
}