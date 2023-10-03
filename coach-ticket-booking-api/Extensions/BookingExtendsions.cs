using coach_ticket_booking_api.DTOs.Booking;
using coach_ticket_booking_api.Models;

namespace coach_ticket_booking_api.Extensions
{
    public static class BookingExtendsions
    {
        public static Booking ToEntity(this BookingCreateDto createDto)
        {
            if (createDto == null)
                return null;

            return new Booking
            {
                TripID = createDto.TripID,
                TransshipAddress = createDto.TransshipAddress,
                BookingDetails = createDto.BookingDetails?.Select(detail => new BookingDetail
                    {
                        SeatID = detail.SeatID,
                        
                    }).ToList(),
            };
        }
    }
}
