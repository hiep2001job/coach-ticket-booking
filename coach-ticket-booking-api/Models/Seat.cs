using coach_ticket_booking_api.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace coach_ticket_booking_api.Models
{
    public class Seat
    {
        [Key]
        public Guid Id { get; set; }
        public Guid? TripID { get; set; }
        public Guid? BookingID { get; set; }

        public virtual Trip Trip { get; set; }
        public virtual Booking Booking { get; set; }
        public string SeatCode { get; set; }
        public SeatStatus Status { get; set; }

    }
}
