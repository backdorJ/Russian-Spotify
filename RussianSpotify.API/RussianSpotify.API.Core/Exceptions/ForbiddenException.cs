using System.Net;

namespace RussianSpotify.API.Core.Exceptions;

public class ForbiddenException : ApplicationBaseException
{
    public ForbiddenException(string message) : base(message, HttpStatusCode.Forbidden)
    {
    }
}