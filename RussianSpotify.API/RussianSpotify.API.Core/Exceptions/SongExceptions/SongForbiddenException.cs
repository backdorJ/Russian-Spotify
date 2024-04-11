namespace RussianSpotify.API.Core.Exceptions.SongExceptions;

public class SongForbiddenException : ForbiddenException
{
    public SongForbiddenException(string message) : base(message)
    {
    }
}