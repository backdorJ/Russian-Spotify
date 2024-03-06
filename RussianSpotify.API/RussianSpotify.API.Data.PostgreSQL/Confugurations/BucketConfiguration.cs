using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotift.API.Data.PostgreSQL.Confugurations;

public class BucketConfiguration : IEntityTypeConfiguration<Bucket>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Bucket> builder)
    {
        builder.HasKey(x => x.Id);

        builder
            .HasOne(x => x.User)
            .WithOne(y => y.Bucket)
            .HasForeignKey<Bucket>(x => x.UserId)
            .HasPrincipalKey<User>(y => y.Id);

        builder.HasMany(x => x.Songs)
            .WithMany(x => x.Buckets);
    }
}