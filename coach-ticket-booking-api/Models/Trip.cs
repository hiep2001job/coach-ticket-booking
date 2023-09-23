using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class Trip
    {
        [Key]
        public Guid Id { get; set; }
        public Guid RouteID { get; set; }
        public Route Route { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int Price { get; set; }
        public DateTime DepartureDate { get; set; }

        public Guid CoachID { get; set; }
        public Coach Coach { get; set; }

        public virtual ICollection<Seat> Seats { get; set; }

        public Trip()
        {
            Seats = new HashSet<Seat>();
        }
    }
}
