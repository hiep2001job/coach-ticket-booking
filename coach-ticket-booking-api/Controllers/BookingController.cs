using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Booking;
using coach_ticket_booking_api.DTOs.Payment;
using coach_ticket_booking_api.DTOs.Trip;
using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Extensions;
using coach_ticket_booking_api.Filters;
using coach_ticket_booking_api.Helper;
using coach_ticket_booking_api.Helper.RequestHelpers;
using coach_ticket_booking_api.Models;
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

            return Ok(result.Data);

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
        public async Task<ActionResult> GetBookings([FromQuery] BookingManagementParams bookingParams)
        {

            var bookings = _context.Bookings.OrderByDescending(x => x.CreateDate)
                .Select(booking => new BookingDto
                {
                    Id = booking.Id,
                    Email = booking.CustomerEmail,
                    Fullname = booking.CustomerName,
                    PhoneNumber = booking.CustomerPhone,
                    Fee = booking.Fee,
                    Cost = booking.Cost,
                    TicketNumber = booking.TicketNumber,
                    SeatNames = string.Join(",", booking.BookingDetails.Select(bd => bd.Seat.SeatName)),
                    CreateDate = booking.CreateDate,
                    PaymentExpireTime = booking.PaymentExpireTime,
                    BookingCode = booking.BookingCode,
                    DepartureDate = booking.Trip.DepartureDate,
                    DepartureTime = booking.Trip.DepartureTime,
                    ArrivalTime = booking.Trip.ArrivalTime,
                    From = booking.Trip.Route.FromOffice.Name,
                    To = booking.Trip.Route.ToOffice.Name,
                    Price = booking.Trip.Price,
                    TransshipAddress = booking.TransshipAddress,
                    Status = booking.Status,
                })
                .AsQueryable();

            if (!string.IsNullOrEmpty(bookingParams.FromDate))
            {
                var fromDate = DateTime.ParseExact(bookingParams.FromDate, "dd-MM-yyyy",null);
                bookings = bookings.Where(x => x.CreateDate.Date >= fromDate);
            } 
            
            if (!string.IsNullOrEmpty(bookingParams.ToDate))
            {
                var toDate = DateTime.ParseExact(bookingParams.ToDate, "dd-MM-yyyy",null);
                bookings = bookings.Where(x => x.CreateDate.Date <= toDate);
            }

            if (!string.IsNullOrEmpty(bookingParams.Phone))
            {                
                bookings = bookings.Where(x => x.PhoneNumber == bookingParams.Phone);
            }

            if (bookings == null) return BadRequest();

            var pagedBookings = await PagedList<BookingDto>.ToPagedList(bookings,
                bookingParams.PageNumber, bookingParams.PageSize);

            Response.AddPaginationHeader(pagedBookings.MetaData);             

            return Ok(pagedBookings);
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

        [Authorize]
        [HttpGet("my-bookings")]
        public async Task<ActionResult<PagedList<BookingDto>>> GetUserBookings([FromQuery] UserBookingParams bookingParams)
        {
            var result = await _bookingService.GetUserBookings(bookingParams);

            Response.AddPaginationHeader(result.Data.MetaData);

            return Ok(result.Data);
        }


    }
}
