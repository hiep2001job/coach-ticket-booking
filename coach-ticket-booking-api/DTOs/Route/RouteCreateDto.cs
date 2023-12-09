using coach_ticket_booking_api.DTOs.Office;
using coach_ticket_booking_api.Enums;

namespace coach_ticket_booking_api.DTOs.Route
{
    public class RouteCreateDto
    {
        public Guid? Id { get; set; }
        public Guid FromOfficeID { get; set; }
        public Guid ToOfficeID { get; set; }
        public ICollection<OfficeInRouteCreateDto> OfficesInRoute { get; set; }
        public RouteStatus Status { get; set; }
    }
}
