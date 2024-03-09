namespace RussianSpotify.API.Core.Enums;

/// <summary>
/// Стандартные сообщения об ошибке авторизации/регистрации
/// </summary>
public static class AuthErrorMessages
{
    /// <summary>
    /// Пользователь не найден
    /// </summary>
    public const string UserNotFound = "User with this email was not found";

    /// <summary>
    /// Неправильный пароль
    /// </summary>
    public const string WrongPassword = "Wrong password";
    
    /// <summary>
    /// Пароли не совпадают
    /// </summary>
    public const string PasswordIsNotConfirmed = "Passwords are not equals";
    
    /// <summary>
    /// Пользователь с такой почтой уже зарегистрирован
    /// </summary>
    public const string UserWithSameEmail = "User with same email already registered";

    /// <summary>
    /// Пустое Required поле в Reuest
    /// </summary>
    /// <param name="fieldName"></param>
    /// <returns>Empty field error message</returns>
    public static string EmptyField(string fieldName) => $"{fieldName} cannot be empty";

    /// <summary>
    /// Неправильный формат почты
    /// </summary>
    public const string InvalidEmailFormat = "Invalid email format";
}