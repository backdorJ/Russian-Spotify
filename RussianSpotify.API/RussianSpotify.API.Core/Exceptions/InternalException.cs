using System.Net;

namespace RussianSpotify.API.Core.Exceptions;

public class InternalException : ApplicationBaseException
{
    public InternalException(string message) : base(message, HttpStatusCode.InternalServerError)
    {
    }
}