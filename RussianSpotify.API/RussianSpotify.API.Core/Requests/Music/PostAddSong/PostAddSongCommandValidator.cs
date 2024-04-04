using FluentValidation;

namespace RussianSpotify.API.Core.Requests.Music.PostAddSong;

public class PostAddSongCommandValidator : AbstractValidator<PostAddSongCommand>
{
    public PostAddSongCommandValidator()
    {
    }
}