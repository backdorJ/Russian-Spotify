namespace RussianSpotify.API.Core.Exceptions.SongExceptions;

public class BadSongAuthorException : BadRequestException
{
    public BadSongAuthorException(string message) : base(message)
    {
    }
}