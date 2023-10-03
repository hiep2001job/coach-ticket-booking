namespace coach_ticket_booking_api.DTOs.Office
{
    public class OfficeCreateDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public Guid TownId { get; set; }
    }
}
