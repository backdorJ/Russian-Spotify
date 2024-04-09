namespace RussianSpotify.API.Core.Exceptions.SongExceptions;

public class SongBadImageException : BadRequestException
{
    public SongBadImageException(string message) : base(message)
    {
    }
}