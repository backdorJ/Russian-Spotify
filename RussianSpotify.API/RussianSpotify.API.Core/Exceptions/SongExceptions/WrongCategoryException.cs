namespace RussianSpotify.API.Core.Exceptions.SongExceptions;

public class WrongCategoryException : BadRequestException
{
    public WrongCategoryException(string message) : base(message)
    {
    }
}