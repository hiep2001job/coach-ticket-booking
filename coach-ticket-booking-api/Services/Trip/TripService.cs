using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs;
using coach_ticket_booking_api.DTOs.Trip;
using coach_ticket_booking_api.Helper;
using coach_ticket_booking_api.Helper.RequestHelpers;
using Microsoft.EntityFrameworkCore;

namespace coach_ticket_booking_api.Services.Trip
{
    public class TripService:ITripService
    {
        private readonly AppDbContext _context;

        public TripService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ServiceResponseDto<PagedList<TripDto>>> GetTrips(TripParams tripParams)
        {
            var trips = _context.Trips
            .Include(t => t.Route)
            .OrderByDescending(t=>t.CreateDate)
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
            })
            .AsQueryable();

            var pagedTrips = await PagedList<TripDto>.ToPagedList(trips,
                tripParams.PageNumber, tripParams.PageSize);

            return new ServiceResponseDto<PagedList<TripDto>> { Data = pagedTrips };
        } 
    }
}
