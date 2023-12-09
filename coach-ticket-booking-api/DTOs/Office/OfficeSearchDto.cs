using coach_ticket_booking_api.Helper;

namespace coach_ticket_booking_api.DTOs.Office
{
    public class OfficeSearchDto:PaginationParams
    {
        public string? Name { get; set; }
        public string? Address { get; set; }
    }
}
