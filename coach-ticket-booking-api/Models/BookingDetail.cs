using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class BookingDetail
    {
        [Key]
        public Guid Id { get; set; }
        public Guid BookingID { get; set; }
        public Guid SeatID { get; set; }
        public Booking Booking { get; set; }
        public Seat Seat { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
