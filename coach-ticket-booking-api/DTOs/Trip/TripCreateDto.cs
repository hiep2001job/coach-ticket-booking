using coach_ticket_booking_api.Enums;

namespace coach_ticket_booking_api.DTOs.Trip
{
    public class TripCreateDto
    {
        public Guid RouteID { get; set; }
        public string DepartureTime { get; set; }
        public string ArrivalTime { get; set; }
        public int Price { get; set; }
        //public DateTime DepartureDate { get; set; }
        public Guid CoachID { get; set; }

        public TripStatus? Status { get; set; }
    }
}
