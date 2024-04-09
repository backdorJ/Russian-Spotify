namespace RussianSpotify.API.Core.Exceptions.SongExceptions;

public class SongBadRequestException : BadRequestException
{
    public SongBadRequestException(string message) : base(message)
    {
    }
}