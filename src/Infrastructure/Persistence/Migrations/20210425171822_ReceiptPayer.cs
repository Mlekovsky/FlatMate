using Microsoft.EntityFrameworkCore.Migrations;

namespace FlatMate_backend.Infrastructure.Persistence.Migrations
{
    public partial class ReceiptPayer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaidById",
                table: "Receipt",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Receipt_PaidById",
                table: "Receipt",
                column: "PaidById");

            migrationBuilder.AddForeignKey(
                name: "FK_Receipt_Users_PaidById",
                table: "Receipt",
                column: "PaidById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receipt_Users_PaidById",
                table: "Receipt");

            migrationBuilder.DropIndex(
                name: "IX_Receipt_PaidById",
                table: "Receipt");

            migrationBuilder.DropColumn(
                name: "PaidById",
                table: "Receipt");
        }
    }
}
