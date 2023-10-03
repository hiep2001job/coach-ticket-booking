using coach_ticket_booking_api.DTOs.Town;

namespace coach_ticket_booking_api.DTOs.Office
{

    public class OfficeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public Guid TownId { get; set; }
        public TownDto? Town { get; set; }
        public DateTime CreateDate { get; set; }
    }

}
