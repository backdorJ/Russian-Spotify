using System.Net;

namespace RussianSpotify.API.Core.Exceptions.OAuthAccountExceptions;

public class EmailClaimNotFoundException : ApplicationBaseException
{
    public EmailClaimNotFoundException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        : base(message, statusCode)
    {
    }
}