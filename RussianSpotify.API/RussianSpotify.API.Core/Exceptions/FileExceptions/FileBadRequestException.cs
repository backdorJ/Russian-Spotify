namespace RussianSpotify.API.Core.Exceptions.FileExceptions;

public class FileBadRequestException : BadRequestException
{
    public FileBadRequestException(string message) : base(message)
    {
    }
}