using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RussianSpotift.API.Data.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class userFieldFixAndOnFileDeleteSongImageSetNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Files_UserPhotoId1",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Files_ImageId",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UserPhotoId1",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserPhotoId1",
                table: "AspNetUsers");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserPhotoId",
                table: "AspNetUsers",
                column: "UserPhotoId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Files_UserPhotoId",
                table: "AspNetUsers",
                column: "UserPhotoId",
                principalTable: "Files",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Files_ImageId",
                table: "Songs",
                column: "ImageId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Files_UserPhotoId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Files_ImageId",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UserPhotoId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<Guid>(
                name: "UserPhotoId1",
                table: "AspNetUsers",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserPhotoId1",
                table: "AspNetUsers",
                column: "UserPhotoId1");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Files_UserPhotoId1",
                table: "AspNetUsers",
                column: "UserPhotoId1",
                principalTable: "Files",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Files_ImageId",
                table: "Songs",
                column: "ImageId",
                principalTable: "Files",
                principalColumn: "Id");
        }
    }
}
