using coach_ticket_booking_api.DTOs.Email;

namespace coach_ticket_booking_api.Services.Mail
{
    public interface IMailService
    {
        public Task SendEmailAsync(EmailDto emailDto);
        public Task<string> SendEmailWithTemplateAsync(EmailWithTemplateDto emailDto);
    }
}
