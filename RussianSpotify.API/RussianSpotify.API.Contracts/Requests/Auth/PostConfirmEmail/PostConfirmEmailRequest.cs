namespace RussianSpotify.Contracts.Requests.Auth.PostConfirmEmail;

public class PostConfirmEmailRequest
{
    public PostConfirmEmailRequest(PostConfirmEmailRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        Email = request.Email;
        EmailVerificationCodeFromUser = request.EmailVerificationCodeFromUser;
    }

    public PostConfirmEmailRequest()
    {
    }

    /// <summary>
    /// Почта пользователя
    /// </summary>
    public string Email { get; set; } = default!;

    /// <summary>
    /// Код для подтверждения почты
    /// </summary>
    public string EmailVerificationCodeFromUser { get; set; } = default!;
}