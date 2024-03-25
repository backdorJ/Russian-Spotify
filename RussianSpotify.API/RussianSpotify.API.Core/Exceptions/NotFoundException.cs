using System.Net;

namespace RussianSpotify.API.Core.Exceptions;

public class NotFoundException : ApplicationBaseException
{
    public NotFoundException(string message) : base(message, HttpStatusCode.NotFound)
    {
    }
}