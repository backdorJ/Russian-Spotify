namespace RussianSpotify.API.Core.Exceptions.SongExceptions;

public class SongBadCategoryException : BadRequestException
{
    public SongBadCategoryException(string message) : base(message)
    {
    }
}