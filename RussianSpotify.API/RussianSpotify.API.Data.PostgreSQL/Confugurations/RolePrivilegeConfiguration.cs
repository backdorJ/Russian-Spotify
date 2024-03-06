using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RussianSpotify.API.Core.Entities;

namespace RussianSpotift.API.Data.PostgreSQL.Confugurations;

public class RolePrivilegeConfiguration : IEntityTypeConfiguration<RolePrivilege>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<RolePrivilege> builder)
    {
        builder.HasOne(x => x.Role)
            .WithMany(y => y.Privileges)
            .HasForeignKey(y => y.RoleId);

        builder
            .Property(x => x.Privilege);
    }
}