using MediatR;
using Microsoft.EntityFrameworkCore;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Entities;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Exceptions.SubscriptionExceptions;
using RussianSpotify.Contracts.Requests.Music.GetSongContentById;

namespace RussianSpotify.API.Core.Requests.Music.GetSongContentById;

/// <summary>
/// Обработчик для <see cref="GetSongContentByIdQuery"/>
/// </summary>
public class GetSongContentByIdQueryHandler : IRequestHandler<GetSongContentByIdQuery, GetSongContentByIdResponse>
{
    private readonly IDbContext _dbContext;
    private readonly IS3Service _s3Service;
    private readonly IUserContext _userContext;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly ISubscriptionHandler _subscriptionHandler;
    

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст БД</param>
    /// <param name="s3Service">Сервис S3</param>
    public GetSongContentByIdQueryHandler(
        IDbContext dbContext,
        IUserContext userContext,
        IS3Service s3Service, IDateTimeProvider dateTimeProvider, ISubscriptionHandler subscriptionHandler)
    {
        _dbContext = dbContext;
        _s3Service = s3Service;
        _dateTimeProvider = dateTimeProvider;
        _subscriptionHandler = subscriptionHandler;
        _userContext = userContext;
    }

    /// <inheritdoc />
    public async Task<GetSongContentByIdResponse> Handle(
        GetSongContentByIdQuery request,
        CancellationToken cancellationToken)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        // var userId = _userContext.CurrentUserId;
        //
        // if (userId is null)
        //     throw new CurrentUserIdNotFound("NameIdentifier не был найден в Claims");
        //
        // var userSubscription = await _subscriptionHandler.GetSubscription(userId.Value);
        //
        // if (userSubscription.EndDate < _dateTimeProvider.CurrentDate)
           // throw new UserSubscriptionHasExpiredException("Срок действия подписки истёк");
        
        var songFromDb = await _dbContext.Songs
            .Include(x => x.Files)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken)
            ?? throw new EntityNotFoundException<Song>(request.Id);

        songFromDb.Files = songFromDb.Files
            .Where(x => x.Id != songFromDb.ImageId)
            .ToList();
        
        if (songFromDb.Files.Count > 1)
            throw new ApplicationBaseException("У песни не может быть две ссылки на трек");
        
        var songFromS3 = await _s3Service.DownloadFileAsync(
            songFromDb.Files.First().Address,
            cancellationToken: cancellationToken)
            ?? throw new EntityNotFoundException<Entities.File>(songFromDb.Files.First().Address);

        return new GetSongContentByIdResponse(
            songFromS3.Content,
            songFromS3.FileName,
            songFromS3.ContentType);
    }
}