using coach_ticket_booking_api.DTOs.Office;
using coach_ticket_booking_api.DTOs.Seat;
using coach_ticket_booking_api.Models;

namespace coach_ticket_booking_api.DTOs.Trip
{
    public class TripDetailDto
    {
        public Guid Id { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int Price { get; set; }
        public DateTime DepartureDate { get; set; }
        public string FromOffice { get; set; }
        public string ToOffice { get; set; }
        public string CoachType { get; set; } = "Limousine";
        public double Duration { get; set; }
        public ICollection<SeatDto> Seats { get; set; }=new HashSet<SeatDto>();
        public IEnumerable<OfficeInRouteDto> Offices { get; set; } = new HashSet<OfficeInRouteDto>();

    }
}
