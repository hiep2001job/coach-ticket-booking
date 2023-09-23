using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class Address
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool IsPrimary { get; set; }

        public Guid UserID { get; set; }
        public User User { get; set; }
    }
}
