using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Office;
using coach_ticket_booking_api.DTOs.Seat;
using coach_ticket_booking_api.DTOs.Trip;
using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Extensions;
using coach_ticket_booking_api.Helper;
using coach_ticket_booking_api.Helper.RequestHelpers;
using coach_ticket_booking_api.Models;
using coach_ticket_booking_api.Services.Trip;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Linq.Enumerable;

namespace coach_ticket_booking_api.Controllers
{
    public class TripController : BaseApiController
    {
        private readonly AppDbContext _context;
        private readonly ITripService _tripService;

        public TripController(AppDbContext context, ITripService tripService)
        {
            _context = context;
            _tripService = tripService;
        }
        //GET: api/trips-search/
        [HttpGet("trips-detail/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<TripDetailDto>> GetTripDetail(Guid id)
        {
            var result = await _tripService.GetTripDetail(id);
            if (!result.IsSuccess) return NotFound();
            return Ok(result.Data);
        }

        //GET: api/trips-search/
        [HttpGet("trips-search")]
        [AllowAnonymous]
        public async Task<ActionResult<PagedList<TripDto>>> GetTrips([FromQuery] TripSearchDto tripParams)
        {
            //return Ok(tripParams);
            var result = await _tripService.SearchTrips(tripParams);

            if (result.IsSuccess)
                return Ok(result.Data);

            return BadRequest(result.Message);
        }

        // GET: api/trips
        [HttpGet("trips")]
        public async Task<ActionResult<PagedList<TripDto>>> GetTrips([FromQuery] TripParams tripParams)
        {
            var result = await _tripService.GetTrips(tripParams);

            Response.AddPaginationHeader(result.Data.MetaData);

            return Ok(result.Data);
        }

        // GET: api/trips/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> GetTrip(Guid id)
        {
            var trip = await _context.Trips
                .Include(t => t.Route)
                //.ThenInclude(r => r.OfficesInRoute)
                .Include(t => t.Coach)
                .Include(t => t.Seats)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (trip == null)
            {
                return NotFound();
            }

            var tripDto = new TripDto
            {
                Id = trip.Id,
                RouteID = trip.RouteID,
                DepartureTime = trip.DepartureTime,
                ArrivalTime = trip.ArrivalTime,
                Price = trip.Price,
                DepartureDate = trip.DepartureDate,
                CoachID = trip.CoachID,
                Status=trip.TripStatus,
                CreateDate = trip.CreateDate,
                Seats = trip.Seats.Select(s => new SeatDto
                {
                    CreateDate = s.CreateDate,
                    Id = s.Id,
                    SeatName = s.SeatName,
                    Status = s.Status
                }).ToList()
            };

            return Ok(tripDto);
        }

        // POST: api/trips
        [HttpPost]
        public async Task<ActionResult<TripDto>> CreateTrip(TripCreateDto tripCreateDto)
        {
            var departureTime = DateTime.ParseExact(tripCreateDto.DepartureTime, "dd-MM-yyyy HH:mm", null);
            var arrivalTime = DateTime.ParseExact(tripCreateDto.ArrivalTime, "dd-MM-yyyy HH:mm", null);
            var trip = new Trip
            {
                RouteID = tripCreateDto.RouteID,
                DepartureTime = departureTime,
                ArrivalTime = arrivalTime,
                Price = tripCreateDto.Price,
                DepartureDate = departureTime.Date,
                CoachID = tripCreateDto.CoachID,
                DepartureType = (TripDepartureType)departureTime.GetTimeRange(),
                TripStatus=TripStatus.SCHEDULED

            };
            foreach (var number in Range(1, 17))
            {
                var seatA = new Seat
                {
                    SeatName = $"A{number.ToString("D2")}",
                    Status = SeatStatus.Available,
                };
                var seatB = new Seat
                {
                    SeatName = $"B{number.ToString("D2")}",
                    Status = SeatStatus.Available,
                };
                trip.Seats.Add(seatA);
                trip.Seats.Add(seatB);
            }

            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();

            var createdTripDto = new TripDto
            {
                Id = trip.Id,
                RouteID = trip.RouteID,
                DepartureTime = trip.DepartureTime,
                ArrivalTime = trip.ArrivalTime,
                Price = trip.Price,
                DepartureDate = trip.DepartureDate,
                CoachID = trip.CoachID,
                CreateDate = trip.CreateDate,
                Seats = new List<SeatDto>() // Initialize with an empty list for now
            };

            return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, createdTripDto);
        }

        // PUT: api/trips/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrip(Guid id, TripCreateDto tripCreateDto)
        {
            var trip = await _context.Trips.FirstOrDefaultAsync(t => t.Id == id);

            if (trip == null)
            {
                return NotFound();
            }
            var departureTime = DateTime.ParseExact(tripCreateDto.DepartureTime, "dd-MM-yyyy HH:mm", null);
            var arrivalTime = DateTime.ParseExact(tripCreateDto.ArrivalTime, "dd-MM-yyyy HH:mm", null);
            // Update properties of the existing trip entity with DTO values
            trip.RouteID = tripCreateDto.RouteID;
            trip.DepartureTime = departureTime;
            trip.ArrivalTime = arrivalTime;
            trip.Price = tripCreateDto.Price;
            trip.DepartureDate = departureTime.Date;
            trip.DepartureType = (TripDepartureType)departureTime.GetTimeRange();
            trip.CoachID = tripCreateDto.CoachID;
            trip.TripStatus = (TripStatus)tripCreateDto.Status;
            // Update other properties as needed

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/trips/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(Guid id)
        {
            var trip = await _context.Trips.Include(t => t.Seats).FirstOrDefaultAsync(t => t.Id == id);

            if (trip == null)
            {
                return NotFound();
            }

            _context.Trips.Remove(trip);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
