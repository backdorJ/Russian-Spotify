namespace RussianSpotify.API.Core.Exceptions.SongExceptions;

public class SongAuthorNotFound : NotFoundException
{
    public SongAuthorNotFound(string message) : base(message)
    {
    }
}