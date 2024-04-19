using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RussianSpotift.API.Data.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class addedFileOnSongDeleteCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Songs_SongId",
                table: "Files");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Songs_SongId",
                table: "Files",
                column: "SongId",
                principalTable: "Songs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Songs_SongId",
                table: "Files");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Songs_SongId",
                table: "Files",
                column: "SongId",
                principalTable: "Songs",
                principalColumn: "Id");
        }
    }
}
