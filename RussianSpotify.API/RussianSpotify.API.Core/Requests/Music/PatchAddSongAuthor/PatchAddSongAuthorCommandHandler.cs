using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions.SongExceptions;

namespace RussianSpotify.API.Core.Requests.Music.PatchAddSongAuthor;

public class PatchAddSongAuthorCommandHandler : IRequestHandler<PatchAddSongAuthorCommand>
{
    private readonly IDbContext _context;
    private readonly UserManager<User> _userManager;

    public PatchAddSongAuthorCommandHandler(IDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task Handle(PatchAddSongAuthorCommand request, CancellationToken cancellationToken)
    {
        var songFromDb = await _context.Songs
            .FirstOrDefaultAsync(i => i.Id == request.SongId, cancellationToken);

        if (songFromDb is null)
            throw new SongNotFoundException("Song not found");

        var userFromDb = await _context.Users
            .FirstOrDefaultAsync(i => i.Id == request.AuthorId, cancellationToken);

        if (userFromDb is null)
            throw new SongAuthorNotFound("User not found");

        const string roleToSearch = "автор";
        var userRoles = await _userManager.GetRolesAsync(userFromDb);
        var ifContainsAuthorRole = userRoles.Select(i => i.ToLower()).Contains(roleToSearch.ToLower());

        if (!ifContainsAuthorRole)
            throw new SongBadRequest("User is not Author");

        songFromDb.AddAuthor(userFromDb);
        await _context.SaveChangesAsync(cancellationToken);
    }
}