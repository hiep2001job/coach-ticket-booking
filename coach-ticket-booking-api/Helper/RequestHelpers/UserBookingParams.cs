using coach_ticket_booking_api.Enums;

namespace coach_ticket_booking_api.Helper.RequestHelpers
{
    public class UserBookingParams:PaginationParams
    {
        public int? BookingStatus { get; set; } = -1;
    }
}
