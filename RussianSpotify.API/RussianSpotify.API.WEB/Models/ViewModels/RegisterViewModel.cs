
using System.ComponentModel.DataAnnotations;

namespace RussianSpotify.API.WEB.Models.ViewModels;

public class RegisterViewModel
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

    public string? ReturnUrl { get; set; }
}