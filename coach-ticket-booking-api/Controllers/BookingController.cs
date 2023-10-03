using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Booking;
using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Extensions;
using coach_ticket_booking_api.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace coach_ticket_booking_api.Controllers
{
    public class BookingController : BaseApiController
    {
        private readonly AppDbContext _context;

        public BookingController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Customer")]
        [HttpPost("create")]
        public async Task<ActionResult> CreateBooking([FromBody] BookingCreateDto bookingCreate)
        {
            if (bookingCreate == null) return BadRequest();
            if (bookingCreate.BookingDetails == null || bookingCreate.BookingDetails.Count == 0) return BadRequest();

            var trip = await _context.Trips.FindAsync(bookingCreate.TripID);
            if (trip == null) return BadRequest();

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var booking = bookingCreate.ToEntity();
            booking.BookingCode = StringGenerator.GenerateRandomString(6);
            booking.UserID = Guid.Parse(userId);
            booking.TicketNumber = bookingCreate.BookingDetails.Count;

            var seats = await _context.Seats.Where(s => booking.BookingDetails.Where(bs => bs.SeatID == s.Id).Any()).ToListAsync();
            
            if (!seats.Any()) return BadRequest();

            var allSeatsAvalable = seats.All(s=>s.Status==SeatStatus.Available);

            if(!allSeatsAvalable) return BadRequest("Ghế đã được chọn vui lòng chọn lại!");
            


            return Ok(booking);
        }
    }
}
