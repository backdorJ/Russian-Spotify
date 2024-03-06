using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RussianSpotift.API.Data.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class AddSubscribeinUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subscribes_AspNetRoles_RoleId",
                table: "Subscribes");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "Subscribes",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Subscribes_RoleId",
                table: "Subscribes",
                newName: "IX_Subscribes_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subscribes_AspNetUsers_UserId",
                table: "Subscribes",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subscribes_AspNetUsers_UserId",
                table: "Subscribes");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Subscribes",
                newName: "RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_Subscribes_UserId",
                table: "Subscribes",
                newName: "IX_Subscribes_RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subscribes_AspNetRoles_RoleId",
                table: "Subscribes",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
