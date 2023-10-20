using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Booking;
using coach_ticket_booking_api.DTOs.Payment;
using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Extensions;
using coach_ticket_booking_api.Filters;
using coach_ticket_booking_api.Services.Booking;
using coach_ticket_booking_api.Services.Payment;
using coach_ticket_booking_api.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace coach_ticket_booking_api.Controllers
{
    public class BookingController : BaseApiController
    {
        private readonly AppDbContext _context;
        private readonly IVnPayService _vnPayService;
        private readonly IBookingService _bookingService;

        public BookingController(AppDbContext context, IVnPayService vnPayService, IBookingService bookingService)
        {
            _context = context;
            _vnPayService = vnPayService;
            _bookingService = bookingService;
        }

  

        //[Authorize(Roles = "Customer")]
        //[ServiceFilter(typeof(CheckUserStatusFilter))] //Check that user is active but new or inactive
        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<ActionResult> CreateBooking([FromBody] BookingCreateDto bookingCreate)
        {
            //validate
            if (!ModelState.IsValid) return BadRequest("Invalid data");

            var result = await _bookingService.CreateBookingAsync(bookingCreate);

            if (!result.IsSuccess) return BadRequest(result.Message);

            return Ok(result);

        }

        [HttpGet("payment-callback")]
        public async Task<ActionResult> PaymentCallback()
        {
            var response = _vnPayService.PaymentExecute(Request.Query);

            var result = await _bookingService.PaymentConfirmBooking(response);

            if (!result.IsSuccess) return BadRequest(result.Message);

            return Ok(result.Message);
        }

        [HttpGet]
        public async Task<ActionResult> GetBookings()
        {
            var bookings = await _context.Bookings.ToListAsync();

            if (bookings == null) return BadRequest();
            
            return Ok(bookings);
        }

        [HttpGet("{bookingId}")]
        public async Task<ActionResult> GetBooking(Guid bookingId)
        {
            var booking = await _context.Bookings
                .Include(b => b.BookingDetails)
                .ThenInclude(bd => bd.Seat)
                .Include(b => b.User)
                .FirstOrDefaultAsync(b => b.Id == bookingId);

            if (booking == null) return BadRequest();

            return Ok(booking);
        }
    }
}
