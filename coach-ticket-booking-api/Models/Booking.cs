using coach_ticket_booking_api.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace coach_ticket_booking_api.Models
{
    public class Booking
    {
        public Booking()
        {
            Seats = new HashSet<Seat>();
        }

        [Key]
        public Guid Id { get; set; }
        public string BookingCode { get; set; }
        public int TicketNumber { get; set; }
        public int Cost { get; set; }
        public BookingStatus Status { get; set; }
        public Guid TripID { get; set; }
        public Trip Trip { get; set; }
        public Guid UserID { get; set; }
        public User User { get; set; }
        public string TransshipAddress { get; set; }

        public virtual ICollection<Seat> Seats { get; set; }

        
    }
}