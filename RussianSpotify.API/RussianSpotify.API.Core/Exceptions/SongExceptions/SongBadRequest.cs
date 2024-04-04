namespace RussianSpotify.API.Core.Exceptions.SongExceptions;

public class SongBadRequest : BadRequestException
{
    public SongBadRequest(string message) : base(message)
    {
    }
}