using coach_ticket_booking_api.Enums;
using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class Coach
    {
        [Key]
        public Guid Id { get; set; }
        public string CoachCode { get; set; }
        public int CoachNumber { get; set; }
        public CoachStatus Status { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;

        public ICollection<Trip> Trips { get; set; }=new HashSet<Trip>(); 
    }
}
