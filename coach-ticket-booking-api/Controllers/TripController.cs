using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Seat;
using coach_ticket_booking_api.DTOs.Trip;
using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Linq.Enumerable;

namespace coach_ticket_booking_api.Controllers
{
    public class TripController:BaseApiController
    {
        private readonly AppDbContext _context;

        public TripController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/trips
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetTrips()
        {
            var trips = await _context.Trips
                .Include(t => t.Route)
                .Include(t => t.Coach)
                .Include(t => t.Seats)
                .Select(t => new TripDto
                {
                    Id = t.Id,
                    RouteID = t.RouteID,
                    DepartureTime = t.DepartureTime,
                    ArrivalTime = t.ArrivalTime,
                    Price = t.Price,
                    DepartureDate = t.DepartureDate,
                    CoachID = t.CoachID,
                    CreateDate = t.CreateDate,
                    Seats = t.Seats.Select(s => new SeatDto
                    {
                        CreateDate = s.CreateDate,
                        Id = s.Id,
                        SeatName = s.SeatName,
                        Status = s.Status
                    }).ToList()
                })
                .ToListAsync();

            return Ok(trips);
        }

        // GET: api/trips/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> GetTrip(Guid id)
        {
            var trip = await _context.Trips
                .Include(t => t.Route)
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
            var trip = new Trip
            {
                RouteID = tripCreateDto.RouteID,
                DepartureTime = tripCreateDto.DepartureTime,
                ArrivalTime = tripCreateDto.ArrivalTime,
                Price = tripCreateDto.Price,
                DepartureDate = tripCreateDto.DepartureDate,
                CoachID = tripCreateDto.CoachID,
            };
            foreach(var number in Range(1, 15))
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

            // Update properties of the existing trip entity with DTO values
            trip.RouteID = tripCreateDto.RouteID;
            trip.DepartureTime = tripCreateDto.DepartureTime;
            trip.ArrivalTime = tripCreateDto.ArrivalTime;
            trip.Price = tripCreateDto.Price;
            trip.DepartureDate = tripCreateDto.DepartureDate;
            trip.CoachID = tripCreateDto.CoachID;
            // Update other properties as needed

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/trips/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(Guid id)
        {
            var trip = await _context.Trips.Include(t=>t.Seats).FirstOrDefaultAsync(t => t.Id == id);

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
