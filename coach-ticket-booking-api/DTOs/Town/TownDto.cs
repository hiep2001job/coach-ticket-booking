using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.DTOs.Town
{
    public class TownDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
    }
}
