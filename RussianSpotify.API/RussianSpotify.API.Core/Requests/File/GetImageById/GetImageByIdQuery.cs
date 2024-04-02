using MediatR;
using RussianSpotify.Contracts.Requests.File.GetImageById;

namespace RussianSpotify.API.Core.Requests.File.GetImageById;

/// <summary>
/// Запрос на получение фотографии
/// </summary>
public class GetImageByIdQuery : IRequest<GetImageByIdResponse>
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="id">ИД фотки</param>
    public GetImageByIdQuery(Guid id)
        => Id = id;
    
    /// <summary>
    /// ИД фотки
    /// </summary>
    public Guid Id { get; set; }
}