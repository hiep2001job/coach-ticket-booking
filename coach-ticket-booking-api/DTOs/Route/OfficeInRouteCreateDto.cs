namespace coach_ticket_booking_api.DTOs.Route
{
    public class OfficeInRouteCreateDto
    {
        public Guid OfficeId { get; set; }
        public int Order { get; set; }
        public double ArrivalTime { get; set; }
    }
}
