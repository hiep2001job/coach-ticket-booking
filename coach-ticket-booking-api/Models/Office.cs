using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class Office
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public Guid TownId { get; set; }
        public Town? Town { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
    }
}
