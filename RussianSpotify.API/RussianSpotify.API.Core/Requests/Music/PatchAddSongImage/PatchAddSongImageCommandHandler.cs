using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Requests.Music.PatchAddSongImageCommand;

public class PatchAddSongImageCommandHandler : IRequestHandler<PatchAddSongImageCommand>
{
    private readonly IDbContext _context;

    public PatchAddSongImageCommandHandler(IDbContext context)
    {
        _context = context;
    }

    public async Task Handle(PatchAddSongImageCommand request, CancellationToken cancellationToken)
    {
        var songFromDb = await _context.Songs
            .FirstOrDefaultAsync(i => i.Id == request.SongId, cancellationToken);

        if (songFromDb is null)
            throw new SongNotFoundException("Song not found");
        
        var imageFromDb = await _context.Files
            .FirstOrDefaultAsync(i => i.Id == request.ImageId, cancellationToken);

        if (imageFromDb is null)
            throw new SongImageNotFoundException("File not found");

        if (imageFromDb.ContentType is null)
            throw new SongInternalException("File's content type not set");

        if (!imageFromDb.ContentType.StartsWith("image/"))
            throw new SongBadRequest("File is not an image");
        
        songFromDb.SetImage(imageFromDb);
        imageFromDb.SetSong(songFromDb);
        await _context.SaveChangesAsync(cancellationToken);
    }
}