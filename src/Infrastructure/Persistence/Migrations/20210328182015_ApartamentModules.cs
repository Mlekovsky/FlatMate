using Microsoft.EntityFrameworkCore.Migrations;

namespace FlatMate_backend.Infrastructure.Persistence.Migrations
{
    public partial class ApartamentModules : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApartamentId",
                table: "TodoLists",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Module",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Module", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApartamentModule",
                columns: table => new
                {
                    ApartamentId = table.Column<int>(nullable: false),
                    ModuleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApartamentModule", x => new { x.ApartamentId, x.ModuleId });
                    table.ForeignKey(
                        name: "FK_ApartamentModule_Apartaments_ApartamentId",
                        column: x => x.ApartamentId,
                        principalTable: "Apartaments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApartamentModule_Module_ModuleId",
                        column: x => x.ModuleId,
                        principalTable: "Module",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TodoLists_ApartamentId",
                table: "TodoLists",
                column: "ApartamentId");

            migrationBuilder.CreateIndex(
                name: "IX_ApartamentModule_ModuleId",
                table: "ApartamentModule",
                column: "ModuleId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoLists_Apartaments_ApartamentId",
                table: "TodoLists",
                column: "ApartamentId",
                principalTable: "Apartaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoLists_Apartaments_ApartamentId",
                table: "TodoLists");

            migrationBuilder.DropTable(
                name: "ApartamentModule");

            migrationBuilder.DropTable(
                name: "Module");

            migrationBuilder.DropIndex(
                name: "IX_TodoLists_ApartamentId",
                table: "TodoLists");

            migrationBuilder.DropColumn(
                name: "ApartamentId",
                table: "TodoLists");
        }
    }
}
