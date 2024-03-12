namespace RussianSpotify.Contracts.Requests.Account.PostConfirmEmail;

public class PostConfirmEmailRequest
{
    /// <summary>
    /// Почта пользователя
    /// </summary>
    public string Email { get; set; } = default!;
    
    /// <summary>
    /// Код для подтверждения почты
    /// </summary>
    public string EmailVerificationCodeFromUser { get; set; } = default!;
}