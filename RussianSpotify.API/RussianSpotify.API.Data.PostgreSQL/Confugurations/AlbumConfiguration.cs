using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotift.API.Data.PostgreSQL.Confugurations;

public class AlbumConfiguration : IEntityTypeConfiguration<Album>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Album> builder)
    {
        builder
            .Property(x => x.AlbumName)
            .IsRequired();

        builder
            .Property(p => p.ReleaseDate);

        builder
            .HasOne(x => x.Author)
            .WithMany(y => y.AuthorAlbums)
            .HasForeignKey(x => x.AuthorId)
            .HasPrincipalKey(y => y.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(x => x.Songs)
            .WithOne(y => y.Album)
            .HasForeignKey(y => y.AlbumId)
            .HasPrincipalKey(x => x.Id)
            .OnDelete(DeleteBehavior.Cascade);
    }
}