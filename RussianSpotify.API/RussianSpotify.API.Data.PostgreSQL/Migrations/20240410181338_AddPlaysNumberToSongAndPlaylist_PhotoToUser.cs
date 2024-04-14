using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RussianSpotift.API.Data.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class AddPlaysNumberToSongAndPlaylist_PhotoToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "PlaysNumber",
                table: "Songs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "PlaysNumber",
                table: "Playlists",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<Guid>(
                name: "UserPhotoId",
                table: "AspNetUsers",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserPhotoId",
                table: "AspNetUsers",
                column: "UserPhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Files_UserPhotoId",
                table: "AspNetUsers",
                column: "UserPhotoId",
                principalTable: "Files",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Files_UserPhotoId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UserPhotoId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PlaysNumber",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "PlaysNumber",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "UserPhotoId",
                table: "AspNetUsers");
        }
    }
}
