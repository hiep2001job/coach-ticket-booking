using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class Town
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }

        public ICollection<Office> Offices { get; set; }=new HashSet<Office>();
    }
}
