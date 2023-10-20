using coach_ticket_booking_api.Enums;
using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class Route
    {
        [Key]
        public Guid Id { get; set; }
        public Guid FromOfficeID { get; set; }
        public Office FromOffice { get; set; }
        public Guid ToOfficeID { get; set; }
        public Office ToOffice { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public RouteStatus Status { get; set; }
        public virtual ICollection<TimeToOffice> OfficesInRoute { get; set; } = new HashSet<TimeToOffice>();
    }
}
