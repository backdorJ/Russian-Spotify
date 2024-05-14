using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.DefaultSettings;
using RussianSpotify.API.Core.Exceptions.FileExceptions;

namespace RussianSpotify.API.Core.Requests.File.DeleteFile;

/// <summary>
/// Обработчик команды <see cref="DeleteFileCommand"/>
/// </summary>
public class DeleteFileCommandHandler : IRequestHandler<DeleteFileCommand>
{
    private readonly IDbContext _dbContext;
    private readonly IUserContext _userContext;
    private readonly IFileHelper _fileHelper;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст базы данных</param>
    /// <param name="fileHelper">Сервис-помощник для работы с файлами в S3</param>
    /// <param name="userContext">Контекст текущего пользователя</param>
    public DeleteFileCommandHandler(IDbContext dbContext, IS3Service s3Service, IUserContext userContext,
        IFileHelper fileHelper)
    {
        _dbContext = dbContext;
        _userContext = userContext;
        _fileHelper = fileHelper;
    }

    /// <inheritdoc/>
    public async Task Handle(DeleteFileCommand request, CancellationToken cancellationToken)
    {
        var fileFromDb = await _dbContext.Files
            .FirstOrDefaultAsync(i => i.Id == request.FileId, cancellationToken);

        if (fileFromDb is null)
            throw new FileBadRequestException("File not found");

        var currentUserId = _userContext.CurrentUserId;

        if (currentUserId is null)
            throw new FileInternalException("Current User Id not found");

        if (fileFromDb.UserId != currentUserId.Value && _userContext.RoleName != BaseRoles.AdminRoleName)
            throw new FileBadRequestException("You cant delete this file!");

        await _fileHelper.DeleteFileAsync(fileFromDb, cancellationToken);
    }
}