using System.Net;

namespace RussianSpotify.API.Core.Exceptions.OAuthAccountExceptions;

/// <summary>
/// Если не найден Claim с типом Email
/// </summary>
public class EmailClaimNotFoundException : ApplicationBaseException
{
    public EmailClaimNotFoundException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        : base(message, statusCode)
    {
    }
}