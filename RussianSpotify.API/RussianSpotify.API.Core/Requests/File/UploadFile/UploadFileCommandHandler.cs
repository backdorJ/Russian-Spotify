using MediatR;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Models;
using RussianSpotify.Contracts.Requests.File.UploadFile;

namespace RussianSpotify.API.Core.Requests.File.UploadFile;

/// <summary>
/// Обработчик для <see cref="UploadFileCommand"/>
/// </summary>
public class UploadFileCommandHandler : IRequestHandler<UploadFileCommand, UploadFileResponse>
{
    private readonly IDbContext _dbContext;
    private readonly IS3Service _s3Service;
    
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="s3Service">Сервис S3</param>
    /// <param name="dbContext">Контекст БД</param>
    public UploadFileCommandHandler(IS3Service s3Service, IDbContext dbContext)
    {
        _s3Service = s3Service;
        _dbContext = dbContext;
    }
    
    /// <inheritdoc />
    public async Task<UploadFileResponse> Handle(UploadFileCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));
        
        var filesToSave = new List<Entities.File>();
        foreach (var file in request.Files)
        {
            if (string.IsNullOrWhiteSpace(file.FileName))
                throw new ArgumentNullException(nameof(file.FileName));

            if (file.FileStream.Length <= 0)
                throw new ArgumentException($"Некоректное кол-во байт");

            var address = await _s3Service.UploadAsync(
                fileContent: new FileContent
                {
                    Content = file.FileStream,
                    FileName = file.FileName,
                    ContentType = file.ContentType
                },
                cancellationToken: cancellationToken);
            
            filesToSave.Add(new Entities.File(
                fileName: file.FileName,
                contentType: file.ContentType,
                address: address,
                size: file.FileStream.Length));
        }

        await _dbContext.Files.AddRangeAsync(filesToSave, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new UploadFileResponse(filesToSave.Select(x => new UploadFileResponseItem(
            x.FileName ?? string.Empty,
            x.Id)));
    }
}