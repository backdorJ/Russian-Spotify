using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RussianSpotift.API.Data.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class AddedEntityEmailNotificationAddedEmailTO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailTo",
                table: "EmailNotifications",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailTo",
                table: "EmailNotifications");
        }
    }
}
