
namespace RussianSpotify.API.WEB.Models.ViewModels;

public class RegisterViewModel
{
    public string Login { get; set; }
    
    public string Password { get; set; }
    
    public string PasswordConfirm { get; set; }
    
    public string Email { get; set; }
    
    public string? ReturnUrl { get; set; }
}