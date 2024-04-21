using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RussianSpotift.API.Data.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class addedPlaylistUserTableModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistUser_AspNetUsers_UsersId",
                table: "PlaylistUser");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistUser_Playlists_PlaylistsId",
                table: "PlaylistUser");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "PlaylistUser",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "PlaylistsId",
                table: "PlaylistUser",
                newName: "PlaylistId");

            migrationBuilder.RenameIndex(
                name: "IX_PlaylistUser_UsersId",
                table: "PlaylistUser",
                newName: "IX_PlaylistUser_UserId");

            migrationBuilder.AddColumn<DateTime>(
                name: "AddedDate",
                table: "PlaylistUser",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistUser_AspNetUsers_UserId",
                table: "PlaylistUser",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistUser_Playlists_PlaylistId",
                table: "PlaylistUser",
                column: "PlaylistId",
                principalTable: "Playlists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistUser_AspNetUsers_UserId",
                table: "PlaylistUser");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistUser_Playlists_PlaylistId",
                table: "PlaylistUser");

            migrationBuilder.DropColumn(
                name: "AddedDate",
                table: "PlaylistUser");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "PlaylistUser",
                newName: "UsersId");

            migrationBuilder.RenameColumn(
                name: "PlaylistId",
                table: "PlaylistUser",
                newName: "PlaylistsId");

            migrationBuilder.RenameIndex(
                name: "IX_PlaylistUser_UserId",
                table: "PlaylistUser",
                newName: "IX_PlaylistUser_UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistUser_AspNetUsers_UsersId",
                table: "PlaylistUser",
                column: "UsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistUser_Playlists_PlaylistsId",
                table: "PlaylistUser",
                column: "PlaylistsId",
                principalTable: "Playlists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
