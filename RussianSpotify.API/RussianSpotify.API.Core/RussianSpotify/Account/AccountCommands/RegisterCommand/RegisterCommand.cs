using System.ComponentModel.DataAnnotations;
using MediatR;

namespace RussianSpotify.API.Core.RussianSpotify.Account.AccountCommands.RegisterCommand;

public class RegisterCommand: IRequest<AccountCommandResult>
{
    [Required]
    public string UserName { get; set; }
    
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    
    [Required]
    [DataType(DataType.Password)]
    public string PasswordConfirm { get; set; }
    
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }
}