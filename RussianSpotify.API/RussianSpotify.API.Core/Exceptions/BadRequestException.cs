using System.Net;

namespace RussianSpotify.API.Core.Exceptions;

public class BadRequestException : ApplicationBaseException
{
    public BadRequestException(string message) : base(message, HttpStatusCode.BadRequest)
    {
    }
}