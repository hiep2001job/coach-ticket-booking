namespace coach_ticket_booking_api.DTOs.Email
{
    public class EmailDto
    {
        public string ToMail { get; set; }
        public string ToName { get; set; }
        public string Subject { get; set; }
        public string? Message { get; set; }

    }
}
