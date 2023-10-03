namespace coach_ticket_booking_api.DTOs.Email
{
    public class EmailWithTemplateDto:EmailDto
    {
        public long TemplateId { get; set; }
        public Dictionary<string, object> TemplateVariables { get; set; }
    }
}
