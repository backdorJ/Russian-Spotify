using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RussianSpotify.API.Core.Entities;
using File = RussianSpotify.API.Core.Entities.File;

namespace RussianSpotift.API.Data.PostgreSQL.Confugurations;

public class PlaylistConfiguration : IEntityTypeConfiguration<Playlist>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Playlist> builder)
    {
        builder
            .Property(x => x.PlaylistName)
            .IsRequired();

        builder
            .Property(p => p.ReleaseDate);

        builder.HasOne(x => x.Image)
            .WithOne(y => y.Playlist);
        
        builder
            .HasOne(x => x.Author)
            .WithMany(y => y.AuthorPlaylists)
            .HasForeignKey(x => x.AuthorId)
            .HasPrincipalKey(y => y.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(x => x.Songs)
            .WithMany(y => y.Playlists);

        builder.HasMany(i => i.Users)
            .WithMany(i => i.Playlists);
    }
}