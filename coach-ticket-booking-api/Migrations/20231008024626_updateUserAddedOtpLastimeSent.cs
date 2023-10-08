using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace coach_ticket_booking_api.Migrations
{
    public partial class updateUserAddedOtpLastimeSent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastTimeSendOtp",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastTimeSendOtp",
                table: "AspNetUsers");
        }
    }
}
