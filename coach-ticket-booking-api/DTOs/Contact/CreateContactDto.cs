using coach_ticket_booking_api.Enums;
using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.DTOs.Contact
{
    public class CreateContactDto
    {
        public string SenderEmail { get; set; }
        public string SenderPhone { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
    }
}
