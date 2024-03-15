using Microsoft.Extensions.Configuration;
using MimeKit;
using RussianSpotify.API.Core.Abstractions;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace RussianSpotify.API.Core.Services;

/// <summary>
/// Отвечает за отправку писем на почту
/// </summary>
public class EmailSender : IEmailSender
{
    private readonly IConfiguration _configuration;

    public EmailSender(IConfiguration configuration)
        => _configuration = configuration;

    /// <inheritdoc cref="IEmailSender"/>
    public async Task SendEmail(string to, string message, CancellationToken cancellationToken)
    {
        var emailConfiguration = _configuration.GetSection("EmailSettings");
        
        using var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress(emailConfiguration["FromName"],
            emailConfiguration["EmailAddress"]));

        emailMessage.To.Add(new MailboxAddress("", to));
        
        emailMessage.Subject = emailConfiguration["FromName"];
        
        var bodyBuilder = new BodyBuilder { HtmlBody = message };
        
        var body = bodyBuilder.ToMessageBody();
        
        emailMessage.Body = body;  
        
        using var client = new SmtpClient();
            
        await client.ConnectAsync(emailConfiguration["SMTPServerHost"],
            int.Parse(emailConfiguration["SMTPServerPort"]!), true, cancellationToken);
        
        await client.AuthenticateAsync(emailConfiguration["EmailAddress"],
            emailConfiguration["Password"], cancellationToken);
        
        await client.SendAsync(emailMessage, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);
    }
}