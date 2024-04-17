namespace RussianSpotify.API.Core.Exceptions.File;

public class FileBadRequestException : BadRequestException
{
    public FileBadRequestException(string message) : base(message)
    {
    }
}