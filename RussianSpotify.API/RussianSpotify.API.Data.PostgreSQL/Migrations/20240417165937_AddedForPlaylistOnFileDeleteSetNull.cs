using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RussianSpotift.API.Data.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class AddedForPlaylistOnFileDeleteSetNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Playlists_Files_ImageId",
                table: "Playlists");

            migrationBuilder.AddForeignKey(
                name: "FK_Playlists_Files_ImageId",
                table: "Playlists",
                column: "ImageId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Playlists_Files_ImageId",
                table: "Playlists");

            migrationBuilder.AddForeignKey(
                name: "FK_Playlists_Files_ImageId",
                table: "Playlists",
                column: "ImageId",
                principalTable: "Files",
                principalColumn: "Id");
        }
    }
}
