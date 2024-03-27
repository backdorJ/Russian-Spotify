namespace RussianSpotify.API.Core.Models;

public static class Templates
{
    /// <summary>
    /// Отправка уведмоления о том что осталось 7 дней до конца подписки
    /// </summary>
    public const string SendEndSubscribeNotification = "SendEndSubscribeNotification.html";

    /// <summary>
    /// Отпрака сообщения с токеном подтверждения почты
    /// </summary>
    public const string SendEmailConfirmationMessage = "SendEmailConfirmationMessage.html";

    /// <summary>
    /// Отправка сообщения с токеном подтверждения для смены пароля
    /// </summary>
    public const string SendPasswordResetConfirmationMessage = "SendPasswordResetConfirmationMessage.html";

    /// <summary>
    /// Отправка уведомления о том, что данные аккаунта были изменены
    /// </summary>
    public const string SendUserInfoUpdatedNotification = "SendUserInfoUpdatedNotification.html";
}
