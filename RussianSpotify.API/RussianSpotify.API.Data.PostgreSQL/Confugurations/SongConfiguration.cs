using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotift.API.Data.PostgreSQL.Confugurations;

public class SongConfiguration : IEntityTypeConfiguration<Song>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Song> builder)
    {
        builder
            .Property(p => p.SongName)
            .IsRequired();

        builder
            .Property(p => p.Duration)
            .IsRequired();

        builder
            .HasOne(x => x.Album)
            .WithMany(y => y.Songs)
            .HasForeignKey(x => x.AlbumId)
            .HasPrincipalKey(y => y.Id);

        builder
            .HasMany(x => x.Authors)
            .WithMany(y => y.Songs);

        builder
            .HasOne(x => x.File)
            .WithMany(y => y.Songs)
            .HasForeignKey(y => y.FileId)
            .HasPrincipalKey(x => x.Id);
    }
}