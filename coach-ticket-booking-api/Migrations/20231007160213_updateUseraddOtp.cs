using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace coach_ticket_booking_api.Migrations
{
    public partial class updateUseraddOtp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Otp",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "OtpExpireTime",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Otp",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "OtpExpireTime",
                table: "AspNetUsers");
        }
    }
}
