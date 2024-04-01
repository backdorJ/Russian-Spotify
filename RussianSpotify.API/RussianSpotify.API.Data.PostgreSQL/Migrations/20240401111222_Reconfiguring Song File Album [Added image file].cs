using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RussianSpotift.API.Data.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class ReconfiguringSongFileAlbumAddedimagefile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Files_FileId",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_Songs_FileId",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "FileId",
                table: "Songs");

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Songs",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SongId",
                table: "Files",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Albums",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Songs_ImageId",
                table: "Songs",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Files_SongId",
                table: "Files",
                column: "SongId");

            migrationBuilder.CreateIndex(
                name: "IX_Albums_ImageId",
                table: "Albums",
                column: "ImageId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Files_ImageId",
                table: "Albums",
                column: "ImageId",
                principalTable: "Files",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Songs_SongId",
                table: "Files",
                column: "SongId",
                principalTable: "Songs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Files_ImageId",
                table: "Songs",
                column: "ImageId",
                principalTable: "Files",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Files_ImageId",
                table: "Albums");

            migrationBuilder.DropForeignKey(
                name: "FK_Files_Songs_SongId",
                table: "Files");

            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Files_ImageId",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_Songs_ImageId",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_Files_SongId",
                table: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Albums_ImageId",
                table: "Albums");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "SongId",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Albums");

            migrationBuilder.AddColumn<Guid>(
                name: "FileId",
                table: "Songs",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Songs_FileId",
                table: "Songs",
                column: "FileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Files_FileId",
                table: "Songs",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
