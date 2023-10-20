using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class TimeToOffice
    {
        [Key]
        public Guid Id { get; set; }
        public Guid RouteID { get; set; }
        public Route Route { get; set; }
        public Guid OfficeID { get; set; }
        public Office Office { get; set; }
        public int Order { get; set; }
        public double ArrivalTime { get; set; }
    }
}
