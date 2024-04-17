using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions.File;

namespace RussianSpotify.API.Core.Requests.File.DeleteFile;

public class DeleteFileCommandHandler : IRequestHandler<DeleteFileCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IS3Service _s3Service;
    private readonly IUserContext _userContext;

    public DeleteFileCommandHandler(IDbContext dbContext, IS3Service s3Service, IUserContext userContext)
    {
        _dbContext = dbContext;
        _s3Service = s3Service;
        _userContext = userContext;
    }

    public async Task Handle(DeleteFileCommand request, CancellationToken cancellationToken)
    {
        var fileFromDb = await _dbContext.Files
            .FirstOrDefaultAsync(i => i.Id == request.FileId, cancellationToken);

        if (fileFromDb is null)
            throw new FileBadRequestException("File not found");

        await _s3Service.DeleteAsync(fileFromDb.Address, cancellationToken: cancellationToken);
        _dbContext.Files.Remove(fileFromDb);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}