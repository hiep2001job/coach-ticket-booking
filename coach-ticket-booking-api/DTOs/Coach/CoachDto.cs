using coach_ticket_booking_api.Enums;

namespace coach_ticket_booking_api.DTOs.Coach
{
    public class CoachDto
    {
        public Guid Id { get; set; }
        public string CoachCode { get; set; }
        public int CoachNumber { get; set; }
        public CoachStatus Status { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
