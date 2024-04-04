namespace RussianSpotify.API.Core.Exceptions.SongExceptions;

public class SongImageNotFoundException : NotFoundException
{
    public SongImageNotFoundException(string message) : base(message)
    {
    }
}