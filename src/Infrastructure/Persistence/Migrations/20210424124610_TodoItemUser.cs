using Microsoft.EntityFrameworkCore.Migrations;

namespace FlatMate_backend.Infrastructure.Persistence.Migrations
{
    public partial class TodoItemUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedUserId",
                table: "TodoItems",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TodoItems_AssignedUserId",
                table: "TodoItems",
                column: "AssignedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_Users_AssignedUserId",
                table: "TodoItems",
                column: "AssignedUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_Users_AssignedUserId",
                table: "TodoItems");

            migrationBuilder.DropIndex(
                name: "IX_TodoItems_AssignedUserId",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "AssignedUserId",
                table: "TodoItems");
        }
    }
}
