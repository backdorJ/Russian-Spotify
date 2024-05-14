using System.ComponentModel;

namespace RussianSpotify.Contracts.Enums;

/// <summary>
/// Категории
/// </summary>
public enum CategoryTypes
{
    [Description("Реп")] 
    Rap = 1,

    [Description("Хип-хоп")]
    HipHop = 2,
    
    [Description("Металл")]
    Metall = 3,
    
    [Description("Рок")]
    Rock = 4,
}