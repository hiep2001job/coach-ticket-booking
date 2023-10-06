using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace coach_ticket_booking_api.Migrations
{
    public partial class UpdateBookingAddedExpireTimes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ChoosingExpireTime",
                table: "Bookings",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentExpireTime",
                table: "Bookings",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChoosingExpireTime",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "PaymentExpireTime",
                table: "Bookings");
        }
    }
}
