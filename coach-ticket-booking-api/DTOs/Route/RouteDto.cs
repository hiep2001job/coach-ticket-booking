using coach_ticket_booking_api.DTOs.Office;
using coach_ticket_booking_api.Enums;

namespace coach_ticket_booking_api.DTOs.Route
{
    public class RouteDto
    {
        public Guid Id { get; set; }
        public Guid FromOfficeID { get; set; }
        public Guid ToOfficeID { get; set; }
        public DateTime CreateDate { get; set; }
        public RouteStatus Status { get; set; }
        public OfficeDto FromOffice { get; set; }
        public OfficeDto ToOffice { get; set; }
    }
}
