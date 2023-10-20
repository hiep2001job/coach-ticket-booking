namespace coach_ticket_booking_api.DTOs.Trip
{
    public class TripSearchDto
    {
        public Guid DestOfficeId { get; set; }
        public Guid OriginOfficeId { get; set; }
        public string DepartureDate { get; set; }
        public int TicketCount { get; set; }
        public int[]? Floor { get; set; } = Array.Empty<int>();
        public int[]? SeatType { get; set; } = Array.Empty<int>();
        public int[]? SeatLine { get; set; } = Array.Empty<int>();
        public int[]? DepartureType { get; set; } = Array.Empty<int>();

    }
}
