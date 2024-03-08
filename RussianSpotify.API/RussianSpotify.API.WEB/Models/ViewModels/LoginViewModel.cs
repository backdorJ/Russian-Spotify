using System.ComponentModel.DataAnnotations;

namespace RussianSpotify.API.WEB.Models.Dtos;

public class LoginViewModel
{
    [Required]
    public string Login { get; set; }
    
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    public bool RememberMe { get; set; } = false;
    
    public string? ReturnUrl { get; set; }
}