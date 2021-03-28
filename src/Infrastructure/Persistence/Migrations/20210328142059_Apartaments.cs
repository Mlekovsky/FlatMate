using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FlatMate_backend.Infrastructure.Persistence.Migrations
{
    public partial class Apartaments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Apartaments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    LastModifiedBy = table.Column<string>(nullable: true),
                    LastModified = table.Column<DateTime>(nullable: true),
                    ShortName = table.Column<string>(maxLength: 200, nullable: false),
                    City = table.Column<string>(maxLength: 200, nullable: false),
                    Address = table.Column<string>(maxLength: 300, nullable: false),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordKey = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Apartaments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserApartaments",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    ApartamentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserApartaments", x => new { x.ApartamentId, x.UserId });
                    table.ForeignKey(
                        name: "FK_UserApartaments_Apartaments_ApartamentId",
                        column: x => x.ApartamentId,
                        principalTable: "Apartaments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserApartaments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserApartaments_UserId",
                table: "UserApartaments",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserApartaments");

            migrationBuilder.DropTable(
                name: "Apartaments");
        }
    }
}
