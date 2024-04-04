namespace RussianSpotify.API.Core.Exceptions.SongExceptions;

public class SongNotFoundException : NotFoundException
{
    public SongNotFoundException(string message) : base(message)
    {
    }
}