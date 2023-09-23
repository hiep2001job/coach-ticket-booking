using coach_ticket_booking_api.Enums;
using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class News
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public bool IsFetured { get; set; }
        public DateTime CreateDate { get; set; }

        public NewsStatus Status { get; set; }
        public Guid CreatorID { get; set; }
        public User Creator { get; set; }

    }
}
