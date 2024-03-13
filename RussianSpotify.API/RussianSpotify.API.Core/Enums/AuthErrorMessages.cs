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

    /// <summary>
    /// Новый пароль и старый совпадают
    /// </summary>
    public const string EqualsOldAndNewPasswords = "The new password must not be equal to the old one";

    /// <summary>
    /// Пароль короче минимальной длины
    /// </summary>
    /// <param name="requiredLength">Минимальная длина пароля</param>
    /// <returns></returns>
    public static string ShortPassword(int requiredLength) 
        => $"The password must be more than {requiredLength} symbols";

    /// <summary>
    /// Некорректный JWT
    /// </summary>
    public const string InvalidAccessToken = "Invalid Access Token";
    
    /// <summary>
    /// Некорректный Refresh Token
    /// </summary>
    public const string InvalidRefreshToken = "Invalid Refresh Token";

    /// <summary>
    /// Неверный код подтверждения
    /// </summary>
    public const string WrongConfirmationToken = "Confirmation token is wrong";

    /// <summary>
    /// Неподтверждённая почта
    /// </summary>
    public const string NotConfirmedEmail = "You need to confirm your Email Address";

    /// <summary>
    /// Если в Claim'ах не пришла почта
    /// </summary>
    public const string EmailClaimNotFound = "Email was not found";
}