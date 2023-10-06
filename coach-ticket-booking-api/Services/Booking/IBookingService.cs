using coach_ticket_booking_api.DTOs;
using coach_ticket_booking_api.DTOs.Booking;

namespace coach_ticket_booking_api.Services.Booking
{
    public interface IBookingService
    {
        Task<ServiceResponseDto<BookingDto>> CreateBookingAsync(BookingCreateDto bookingCreate);
    }
}
