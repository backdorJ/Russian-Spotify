namespace RussianSpotify.Contracts.Requests.Auth.PostRevokeToken;

public class PostRevokeTokenRequest
{
    public PostRevokeTokenRequest(PostRevokeTokenRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        Email = request.Email;
    }
    
    public PostRevokeTokenRequest()
    {
    }
    
    /// <summary>
    /// Email пользователя
    /// </summary>
    public string Email { get; set; } = default!;
}