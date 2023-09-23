using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class Coach
    {
        [Key]
        public Guid Id { get; set; }
        public string CoachCode { get; set; }
        public int CoachNumber { get; set; }
        public string Status { get; set; }

        public ICollection<Trip> Trips { get; set; }=new List<Trip>(); 
    }
}
