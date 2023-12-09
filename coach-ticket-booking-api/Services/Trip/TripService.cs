using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs;
using coach_ticket_booking_api.DTOs.Office;
using coach_ticket_booking_api.DTOs.Seat;
using coach_ticket_booking_api.DTOs.Trip;
using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Extensions;
using coach_ticket_booking_api.Helper;
using coach_ticket_booking_api.Helper.RequestHelpers;
using coach_ticket_booking_api.Utils;
using Microsoft.EntityFrameworkCore;

namespace coach_ticket_booking_api.Services.Trip
{
    public class TripService : ITripService
    {
        private readonly AppDbContext _context;

        public TripService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ServiceResponseDto<List<TripSearchResultDto>>> SearchTrips(TripSearchDto tripSearchDto)
        {
            var tripDtos = await _context.Trips.FilterTrips(tripSearchDto)
                .Select(t => new TripSearchResultDto
                {
                    Id = t.Id,
                    ArrivalTime = t.ArrivalTime,
                    AvailableSeatNumber = t.Seats.Where(s => s.Status == SeatStatus.Available).Count(),
                    CoachType = t.SeatType.GetDescription(),
                    Price = t.Price,
                    DepartureDate = t.DepartureDate,
                    DepartureTime = t.DepartureTime,
                    FromOffice = t.Route.FromOffice.Name,
                    ToOffice = t.Route.ToOffice.Name,
                    Duration = t.DepartureTime.DateDiffInHours(t.ArrivalTime)
                }).ToListAsync();
            if (tripDtos == null)
                return new ServiceResponseDto<List<TripSearchResultDto>> { IsSuccess = false, Message = "Failed to search trips" };

            return new ServiceResponseDto<List<TripSearchResultDto>> { Data = tripDtos };
        }
        public async Task<ServiceResponseDto<PagedList<TripSearchResultDto>>> GetTrips(TripParams tripParams)
        {
            var trips = _context.Trips
            .Include(t => t.Route)
            .OrderByDescending(t => t.CreateDate)
            .Select(t => new TripSearchResultDto
            {
                Id = t.Id,
                ArrivalTime = t.ArrivalTime,
                AvailableSeatNumber = t.Seats.Where(s => s.Status == SeatStatus.Available).Count(),
                CoachType = t.SeatType.GetDescription(),
                Price = t.Price,
                DepartureDate = t.DepartureDate,
                DepartureTime = t.DepartureTime,
                FromOffice = t.Route.FromOffice.Name,
                ToOffice = t.Route.ToOffice.Name,
                Duration = t.DepartureTime.DateDiffInHours(t.ArrivalTime),
                Status = t.TripStatus
            })
            .AsQueryable();

            var pagedTrips = await PagedList<TripSearchResultDto>.ToPagedList(trips,
                tripParams.PageNumber, tripParams.PageSize);

            return new ServiceResponseDto<PagedList<TripSearchResultDto>> { Data = pagedTrips };
        }
        
        public async Task<ServiceResponseDto<TripDetailDto>> GetTripDetail(Guid id)
        {
            var trip = await _context.Trips
               .Include(t => t.Route)
                    .ThenInclude(r => r.FromOffice)
               .Include(t => t.Route)
                    .ThenInclude(r => r.ToOffice)
               .Include(t => t.Route)
                    .ThenInclude(r => r.OfficesInRoute)
                        .ThenInclude(oir => oir.Office)
               .Include(t => t.Coach)
               .Include(t => t.Seats)
               .FirstOrDefaultAsync(t => t.Id == id);

            if (trip == null)
            {
                return new ServiceResponseDto<TripDetailDto> { IsSuccess=false,Message="404"};
            }

            var officeInRoute = trip.Route.OfficesInRoute.Select(oir => new OfficeInRouteDto
            {
                OfficeId = oir.OfficeID.ToString(),
                Name = oir.Office.Name,
                Address = oir.Office.Address,
                ArrivalTime = oir.ArrivalTime,
                Order = oir.Order,
            }).ToList();

            officeInRoute.Add(new OfficeInRouteDto
            {
                OfficeId = trip.Route.FromOfficeID.ToString(),
                Name = trip.Route.FromOffice.Name,
                Address = trip.Route.FromOffice.Address,
                ArrivalTime = 0,
                Order = 0,
            });

            officeInRoute.Add(new OfficeInRouteDto
            {
                OfficeId = trip.Route.ToOfficeID.ToString(),
                Name = trip.Route.ToOffice.Name,
                Address = trip.Route.ToOffice.Address,
                ArrivalTime = trip.DepartureTime.DateDiffInHours(trip.ArrivalTime),
                Order = trip.Route.OfficesInRoute.Count + 2,
            });

            officeInRoute = officeInRoute.OrderBy(o => o.ArrivalTime).ToList();

            var tripDto = new TripDetailDto
            {
                Id = trip.Id,
                DepartureTime = trip.DepartureTime,
                ArrivalTime = trip.ArrivalTime,
                Price = trip.Price,
                CoachType = trip.SeatType.ToString(),
                Duration = trip.DepartureTime.DateDiffInHours(trip.ArrivalTime),
                FromOffice = trip.Route.FromOffice.Name,
                ToOffice = trip.Route.ToOffice.Name,
                DepartureDate = trip.DepartureDate,
                Offices = officeInRoute,
                Seats = trip.Seats.Select(s => new SeatDto
                {
                    CreateDate = s.CreateDate,
                    Id = s.Id,
                    SeatName = s.SeatName,
                    Status = s.Status
                }).ToList()
            };
            return new ServiceResponseDto<TripDetailDto> { Data= tripDto };
        }
    }
}
