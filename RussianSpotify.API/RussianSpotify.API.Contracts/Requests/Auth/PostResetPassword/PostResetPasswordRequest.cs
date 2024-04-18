namespace RussianSpotify.Contracts.Requests.Auth.PostResetPassword;

public class PostResetPasswordRequest
{
    public PostResetPasswordRequest(PostResetPasswordRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        Email = request.Email;
    }
    
    public PostResetPasswordRequest()
    {
    }
    
    /// <summary>
    /// Email пользователя
    /// </summary>
    public string Email { get; set; } = default!;
}