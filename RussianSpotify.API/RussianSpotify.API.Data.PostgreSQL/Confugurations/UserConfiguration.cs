using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotift.API.Data.PostgreSQL.Confugurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder
            .Property(p => p.Birthday);

        builder
            .Property(p => p.Phone);

        builder
            .Property(p => p.IsConfirmed)
            .IsRequired();

        builder
            .HasOne(x => x.Subscribe)
            .WithOne(y => y.User)
            .HasForeignKey<Subscribe>(y => y.UserId)
            .HasPrincipalKey<User>(x => x.Id);

        builder
            .HasMany(x => x.AuthorAlbums)
            .WithOne(y => y.Author)
            .HasForeignKey(y => y.AuthorId)
            .HasPrincipalKey(x => x.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(x => x.Songs)
            .WithMany(y => y.Authors);
    }
}