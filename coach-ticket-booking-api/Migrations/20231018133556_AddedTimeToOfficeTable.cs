using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace coach_ticket_booking_api.Migrations
{
    public partial class AddedTimeToOfficeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TimeToOffices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RouteID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OfficeID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    ArrivalTime = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeToOffices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeToOffices_Offices_OfficeID",
                        column: x => x.OfficeID,
                        principalTable: "Offices",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TimeToOffices_Route_RouteID",
                        column: x => x.RouteID,
                        principalTable: "Route",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimeToOffices_OfficeID",
                table: "TimeToOffices",
                column: "OfficeID");

            migrationBuilder.CreateIndex(
                name: "IX_TimeToOffices_RouteID",
                table: "TimeToOffices",
                column: "RouteID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeToOffices");
        }
    }
}
