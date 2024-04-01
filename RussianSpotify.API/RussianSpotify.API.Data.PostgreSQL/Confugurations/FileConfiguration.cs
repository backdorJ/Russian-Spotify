using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RussianSpotify.API.Core.Entities;
using File = RussianSpotify.API.Core.Entities.File;

namespace RussianSpotift.API.Data.PostgreSQL.Confugurations;

public class FileConfiguration : IEntityTypeConfiguration<File>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<File> builder)
    {
        builder
            .Property(p => p.FileName);

        builder
            .Property(p => p.ContentType);

        builder
            .Property(p => p.Address)
            .IsRequired();

        builder
            .Property(p => p.Size)
            .IsRequired();

        builder.HasOne(x => x.Song)
            .WithMany(y => y.Files);

        builder.HasOne(x => x.Album)
            .WithOne(y => y.Image);
    }
}