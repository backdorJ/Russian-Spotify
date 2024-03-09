using System.ComponentModel.DataAnnotations;

namespace RussianSpotify.API.WEB.Models.Dtos;

public class LoginViewModel
{
    [Required]
    public string UserName { get; set; }
    
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    
    public string? ReturnUrl { get; set; }
}