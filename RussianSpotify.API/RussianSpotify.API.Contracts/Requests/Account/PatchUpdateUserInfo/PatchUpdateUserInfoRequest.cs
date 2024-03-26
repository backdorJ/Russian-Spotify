namespace RussianSpotify.Contracts.Requests.Account.PatchUpdateUserInfo;

public class PatchUpdateUserInfoRequest
{
    public PatchUpdateUserInfoRequest(PatchUpdateUserInfoRequest request)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        UserName = request.UserName;
        NewPassword = request.NewPassword;
        NewPasswordConfirm = request.NewPasswordConfirm;
        CurrentPassword = request.CurrentPassword;
    }
    
    public string? UserName { get; set; }
    
    public string? CurrentPassword { get; set; }
    
    public string? NewPassword { get; set; }
    
    public string? NewPasswordConfirm { get; set; }
}