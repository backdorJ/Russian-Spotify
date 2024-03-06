using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotift.API.Data.PostgreSQL.Confugurations;

public class SubscribeConfiguration : IEntityTypeConfiguration<Subscribe>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Subscribe> builder)
    {
        builder.HasOne(x => x.User)
            .WithOne(x => x.Subscribe);
    }
}