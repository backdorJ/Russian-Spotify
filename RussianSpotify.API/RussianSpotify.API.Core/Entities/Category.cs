using RussianSpotify.Contracts.Enums;

namespace RussianSpotify.API.Core.Entities;

/// <summary>
/// Категория
/// </summary>
public class Category
{
    /// <summary>
    /// Конструктор
    /// </summary>
    public Category()
    {
        Songs = new List<Song>();
    }
    
    /// <summary>
    /// Ид категории
    /// </summary>
    public Guid Id { get; protected set; }

    /// <summary>
    /// Имя категории
    /// </summary>
    public CategoryTypes CategoryName { get; protected set; }

    /// <summary>
    /// Песни
    /// </summary>
    public List<Song> Songs { get; protected set; }
}