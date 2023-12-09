using coach_ticket_booking_api.DTOs;
using coach_ticket_booking_api.DTOs.Trip;
using coach_ticket_booking_api.Helper;
using coach_ticket_booking_api.Helper.RequestHelpers;

namespace coach_ticket_booking_api.Services.Trip
{
    public interface ITripService
    {
        Task<ServiceResponseDto<TripDetailDto>> GetTripDetail(Guid id);
        Task<ServiceResponseDto<PagedList<TripSearchResultDto>>> GetTrips(TripParams tripParams);
        Task<ServiceResponseDto<List<TripSearchResultDto>>> SearchTrips(TripSearchDto tripSearchDto);
    }
}
