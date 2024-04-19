namespace RussianSpotify.API.Core.Exceptions.AuthExceptions;

public class UserBadImageException : BadRequestException
{
    public UserBadImageException(string message) : base(message)
    {
    }
}