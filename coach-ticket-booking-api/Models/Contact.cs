using coach_ticket_booking_api.Enums;
using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.Models
{
    public class Contact
    {
        [Key]
        public Guid Id  { get; set; }
        public string SenderEmail { get; set; }

        public string SenderPhone { get; set; }
        public  string Subject { get; set; }
        public string Content { get; set; }

        public string ResponseContent { get; set; }

        public ContactStatus Status { get; set; }
        public Guid SenderID { get; set; }
        public User Sender { get; set; }

        public Guid RespondentID { get; set; }
        public User Respondent { get; set; }
    }
}
