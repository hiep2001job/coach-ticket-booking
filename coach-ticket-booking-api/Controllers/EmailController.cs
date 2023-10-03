using coach_ticket_booking_api.DTOs.Email;
using coach_ticket_booking_api.Services.Mail;
using Microsoft.AspNetCore.Mvc;

namespace coach_ticket_booking_api.Controllers
{
    public class EmailController:BaseApiController
    {
        private readonly IMailService _mailService;

        public EmailController(IMailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost("send-email")]
        public async Task<IActionResult> SendEmail([FromBody] EmailDto email)
        {

            await _mailService.SendEmailAsync(email);

            return Ok("Email sent successfully.");
        }

        [HttpPost("send-email-with-template")]
        public async Task<IActionResult> SendEmailWithTemplate()
        {
            var mail = new EmailWithTemplateDto
            {
                Subject = "Mua vé thành công. Mã vé: IDHSDHW",
                ToMail = "thanhhiep77777@gmail.com",
                ToName = "Hiep Nguyen Thanh",
                TemplateId = 5131224,
                TemplateVariables = new Dictionary<string, object>
                {
                    { "CUSTOMER", "Nguyễn Thành Hiệp" },
                    { "TICKETCODE", "IDHSDHW" },
                    { "BOOKINGDATE", DateTime.Now.ToString() },
                    { "PAYMENT", "VNPAY" },
                    { "CONTACTNAME", "Nguyễn Thành Hiệp" },
                    { "CONTACTEMAIL", "thanhhiep77777@gmail.com" },
                    { "CONTACTPHONE", "0362550694" },
                    { "TRIPDEPARTURE", "Soc Trang" },
                    { "TRIPDESTINATION", "Can Tho" },
                    { "DEPARTURETIME", "16:00" },
                    { "DEPARTUREDAY", "29/09/2023" },
                    { "PREDEPARTURETIME", "15:45" },            
                    { "TICKETPRICE", "170000" },
                    { "TICKETNUMBER", "1" },
                    { "TOTALPRICE", "170000" },
                    { "DISCOUNT", "0" },
                    { "TOTALCOST", "170000" },
                }

            };
            var result= await _mailService.SendEmailWithTemplateAsync(mail);

            return Ok(result);
        }
    }
}
