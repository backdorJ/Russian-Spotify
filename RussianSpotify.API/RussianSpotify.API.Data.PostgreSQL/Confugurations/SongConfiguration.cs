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
            .HasMany(x => x.Playlists)
            .WithMany(y => y.Songs);

        builder
            .HasMany(x => x.Authors)
            .WithMany(y => y.Songs);

        builder.HasMany(x => x.Files)
            .WithOne(y => y.Song);

        builder.Property(x => x.PlaysNumber).HasDefaultValue(0);
    }
}