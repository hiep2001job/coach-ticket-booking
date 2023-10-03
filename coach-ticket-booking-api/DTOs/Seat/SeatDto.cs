using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Models;
using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.DTOs.Seat
{
    public class SeatDto
    {       
        public Guid Id { get; set; }  
        public string SeatName { get; set; }
        public SeatStatus Status { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
