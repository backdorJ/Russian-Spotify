using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.FileException;
using File = RussianSpotify.API.Core.Entities.File;

namespace RussianSpotify.API.Core.Services;

public class FileHelper : IFileHelper
{
    private const string ImageFileStartsWith = "image/";

    public bool IsImage(File file)
    {
        var fileContentType = file.ContentType;
        if (fileContentType is null)
            throw new FileInternalException("File's content type not set");

        return fileContentType.StartsWith(ImageFileStartsWith);
    }
}