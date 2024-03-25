using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotift.API.Data.PostgreSQL.Confugurations;

public class EmailNotificationConfiguration : IEntityTypeConfiguration<EmailNotification>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<EmailNotification> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(p => p.EmailTo)
            .IsRequired();
        
        builder.Property(p => p.Body)
            .IsRequired();

        builder.Property(p => p.Head)
            .IsRequired();

        builder.Property(p => p.SentDate);
    }
}