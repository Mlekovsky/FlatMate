using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FlatMate_backend.Infrastructure.Persistence.Migrations
{
    public partial class Receipts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Receipt",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    LastModifiedBy = table.Column<string>(nullable: true),
                    LastModified = table.Column<DateTime>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Paid = table.Column<bool>(nullable: false),
                    ApartamentId = table.Column<int>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receipt", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Receipt_Apartaments_ApartamentId",
                        column: x => x.ApartamentId,
                        principalTable: "Apartaments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReceiptPosition",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    LastModifiedBy = table.Column<string>(nullable: true),
                    LastModified = table.Column<DateTime>(nullable: true),
                    Product = table.Column<string>(nullable: true),
                    Value = table.Column<double>(nullable: false),
                    ReceiptId = table.Column<int>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceiptPosition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReceiptPosition_Receipt_ReceiptId",
                        column: x => x.ReceiptId,
                        principalTable: "Receipt",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserReceiptPosition",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    ReceiptPositionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserReceiptPosition", x => new { x.ReceiptPositionId, x.UserId });
                    table.ForeignKey(
                        name: "FK_UserReceiptPosition_ReceiptPosition_ReceiptPositionId",
                        column: x => x.ReceiptPositionId,
                        principalTable: "ReceiptPosition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserReceiptPosition_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Receipt_ApartamentId",
                table: "Receipt",
                column: "ApartamentId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceiptPosition_ReceiptId",
                table: "ReceiptPosition",
                column: "ReceiptId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReceiptPosition_UserId",
                table: "UserReceiptPosition",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserReceiptPosition");

            migrationBuilder.DropTable(
                name: "ReceiptPosition");

            migrationBuilder.DropTable(
                name: "Receipt");
        }
    }
}
