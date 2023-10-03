using coach_ticket_booking_api.DTOs.Seat;

namespace coach_ticket_booking_api.DTOs.Trip
{
    public class TripDto
    {
        public Guid Id { get; set; }
        public Guid RouteID { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int Price { get; set; }
        public DateTime DepartureDate { get; set; }
        public Guid CoachID { get; set; }
        public DateTime CreateDate { get; set; }
        public ICollection<SeatDto> Seats { get; set; }
    }
}
