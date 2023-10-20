namespace coach_ticket_booking_api.DTOs.Trip
{
    public class TripSearchResultDto
    {
        public Guid Id { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int Price { get; set; }
        public DateTime DepartureDate { get; set; }
        public string FromOffice { get; set; }
        public string ToOffice { get; set; }
        public string CoachType { get; set; } = "Limousine";
        public int AvailableSeatNumber { get; set; }
        public double Duration { get; set; }
    }
}
