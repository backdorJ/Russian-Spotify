using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.Contracts.Requests.File.GetImageById;

namespace RussianSpotify.API.Core.Requests.File.GetImageById;

/// <summary>
/// Обработчик для <see cref="GetImageByIdQuery"/>
/// </summary>
public class GetImageByIdQueryHandler : IRequestHandler<GetImageByIdQuery, GetImageByIdResponse>
{
    private readonly IDbContext _dbContext;
    private readonly IS3Service _s3Service;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="s3Service">Сервис для работы с файлами</param>
    public GetImageByIdQueryHandler(IDbContext dbContext, IS3Service s3Service)
    {
        _dbContext = dbContext;
        _s3Service = s3Service;
    }

    /// <inheritdoc />
    public async Task<GetImageByIdResponse> Handle(
        GetImageByIdQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        var image = await _dbContext.Files.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (image?.Address is null)
            throw new ArgumentNullException(nameof(image));

        var imageFromS3 = await _s3Service.DownloadFileAsync(image.Address, cancellationToken: cancellationToken);

        if (imageFromS3?.Content is null)
            throw new ApplicationBaseException("Контент файла равен null");

        using var memoryStream = new MemoryStream();
        await imageFromS3.Content.CopyToAsync(memoryStream, cancellationToken);

        return new GetImageByIdResponse(
            content: memoryStream.ToArray(),
            contentType: imageFromS3.ContentType,
            fileName: imageFromS3.FileName);
    }
}