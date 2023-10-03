using coach_ticket_booking_api.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace coach_ticket_booking_api.Models
{
    [Index(nameof(CreateDate),nameof(TripID))]
    public class Seat
    {
        [Key]
        public Guid Id { get; set; }
        public Guid? TripID { get; set; }
        public virtual Trip Trip { get; set; }
        public string SeatName { get; set; }
        public SeatStatus Status { get; set; }
        public BookingDetail BookingDetail { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;

    }
}
