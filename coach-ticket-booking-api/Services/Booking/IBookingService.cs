using coach_ticket_booking_api.DTOs;
using coach_ticket_booking_api.DTOs.Booking;
using coach_ticket_booking_api.DTOs.Payment;
using coach_ticket_booking_api.Helper;
using coach_ticket_booking_api.Helper.RequestHelpers;

namespace coach_ticket_booking_api.Services.Booking
{
    public interface IBookingService
    {
        Task<ServiceResponseDto<BookingDto>> CreateBookingAsync(BookingCreateDto bookingCreate);
        Task<ServiceResponseDto<PagedList<BookingDto>>> GetUserBookings(UserBookingParams bookingParams);
        Task<ServiceResponseDto<BookingDto>> PaymentConfirmBooking(PaymentResponseModel payment);
    }
}
