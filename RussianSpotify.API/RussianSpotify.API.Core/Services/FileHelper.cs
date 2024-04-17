using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.FileExceptions;
using File = RussianSpotify.API.Core.Entities.File;

namespace RussianSpotify.API.Core.Services;

/// <inheritdoc/>
public class FileHelper : IFileHelper
{
    private const string ImageFileStartsWith = "image/";
    private const string AudioFileStartsWith = "audio/";

    public bool IsImage(File file)
    {
        var fileContentType = file.ContentType;
        if (fileContentType is null)
            throw new FileInternalException("File's content type not set");

        return fileContentType.StartsWith(ImageFileStartsWith);
    }

    public bool IsAudio(File file)
    {
        var fileContentType = file.ContentType;
        if (fileContentType is null)
            throw new FileInternalException("File's content type not set");

        return fileContentType.StartsWith(AudioFileStartsWith);
    }
}