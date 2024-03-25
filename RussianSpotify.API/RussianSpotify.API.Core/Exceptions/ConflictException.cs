using System.Net;

namespace RussianSpotify.API.Core.Exceptions;

public class ConflictException : ApplicationBaseException
{
    public ConflictException(string message) : base(message, HttpStatusCode.Conflict)
    {
    }
}