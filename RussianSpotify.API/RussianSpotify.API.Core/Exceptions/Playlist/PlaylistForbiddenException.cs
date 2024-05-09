namespace RussianSpotify.API.Core.Exceptions.Playlist;

public class PlaylistForbiddenException : ForbiddenException
{
    public PlaylistForbiddenException(string message) : base(message)
    {
    }
}