using coach_ticket_booking_api.DTOs.SMS;
using coach_ticket_booking_api.Services.SMS;
using Microsoft.AspNetCore.Mvc;

namespace coach_ticket_booking_api.Controllers
{
    public class SMSController:BaseApiController
    {
        private readonly ISMSService _smsService;

        public SMSController(ISMSService smsService)
        {
            _smsService = smsService;
        }

        [HttpPost("send-sms")]
        public IActionResult Send(SendSMSDto dto)
        {
            var result = _smsService.Send(dto.MobileNumber, dto.Body);

            if (!string.IsNullOrEmpty(result.ErrorMessage))
                return BadRequest(result.ErrorMessage);

            return Ok(result);
        }

   
    }
}
