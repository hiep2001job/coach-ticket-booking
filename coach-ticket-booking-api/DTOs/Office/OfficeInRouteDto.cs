namespace coach_ticket_booking_api.DTOs.Office
{
    public class OfficeInRouteDto
    {
        public string OfficeId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public int Order { get; set; }
        public double ArrivalTime { get; set; }
    }
}
