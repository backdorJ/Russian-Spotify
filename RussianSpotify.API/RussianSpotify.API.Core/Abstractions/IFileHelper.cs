using File = RussianSpotify.API.Core.Entities.File;

namespace RussianSpotify.API.Core.Abstractions;

public interface IFileHelper
{
    bool IsImage(File file);
}