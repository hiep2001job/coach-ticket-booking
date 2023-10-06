using coach_ticket_booking_api.DTOs.Trip;
using coach_ticket_booking_api.Enums;

namespace coach_ticket_booking_api.DTOs.Booking
{
    public class BookingDto
    {
        public Guid Id { get; set; }
        public string BookingCode { get; set; }
        public int TicketNumber { get; set; }
        public int Cost { get; set; }
        public int Fee { get; set; }
        public BookingStatus Status { get; set; }
        public string? TransshipAddress { get; set; }
        //user info
        public string? Email { get; set; }
        public string? Fullname { get; set; }
        public string? PhoneNumber { get; set; } 

        public string SeatNames { get; set; }

        //trip info
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int Price { get; set; }
        public DateTime DepartureDate { get; set; }

        //route info
        public string From { get; set; }
        public string To { get; set; }

        //Payment url
        public string? PaymentUrl { get; set; }

        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime? PaymentExpireTime { get; set; }
    }
}
