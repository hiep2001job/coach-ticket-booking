using coach_ticket_booking_api.Enums;

namespace coach_ticket_booking_api.DTOs.Route
{
    public class RouteCreateDto
    {
        public Guid FromOfficeID { get; set; }
        public Guid ToOfficeID { get; set; }
        public RouteStatus Status { get; set; }
    }
}
